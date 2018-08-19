import React, { Component } from 'react';
import debouncer from '../../util/debouncer';
import { autocomplete } from '../../api/search';
import cancellable from '../../util/cancellable';
import SearchDropdown from './dropdown';
import './index.css';

class Search extends Component {
  state = {
    error: null,
    autocompleteResults: null
  };

  // LIFECYCLE

  UNSAFE_componentWillMount() {
    this.debounceSearch = debouncer(100, query => {
      if (this.cancelAutoComplete) {
        this.cancelAutoComplete();
        this.cancelAutoComplete = null;
      }

      if (!query) {
        this.setState({
          error: null,
          autocompleteResults: null
        });
      } else {
        this.cancelAutoComplete = cancellable(
          autocomplete(query),
          (error, result) => {
            this.cancelAutoComplete = null;
            this.setState({
              error,
              autocompleteResults: result
            });
          }
        );
      }
    });
  }

  UNSAFE_componentWillUnMount() {
    this.debounceSearch.destroy();
    if (this.cancelAutoComplete) {
      this.cancelAutoComplete();
      this.cancelAutoComplete = null;
    }
  }

  // CALLBACKS

  handleInputChanged = event => {
    const text = event.target.value;
    this.setState({ query: text });
    this.debounceSearch(text);
  };

  handleCloseClicked = () => {
    this.setState({ query: null, error: null, autocompleteResults: null });
  };

  handleSearchClicked = () => {
    if (!this.inputRef || !this.inputRef.value) {
      return;
    }

    if (typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.inputRef.value);
    }

    this.setState(
      {
        error: null,
        autocompleteResults: null
      },
      () => {
        // unfocus the input
        if (this.inputRef) {
          this.inputRef.blur();
        }
      }
    );
  };

  handleKeyDown = event => {
    console.log('key', event.key);
    switch (event.key) {
      case 'Enter':
        this.handleSearchClicked();
        break;

      case 'Escape':
        this.handleCloseClicked();
        break;

      case 'ArrowDown':
        if (this.searchDropdownRef) {
          event.preventDefault();
          this.searchDropdownRef.highlightNext(index => {
            const query = this.state.autocompleteResults[index];
            this.setState({
              query
            });
          });
        }
        break;

      case 'ArrowUp':
        if (this.searchDropdownRef) {
          event.preventDefault();
          this.searchDropdownRef.highlightPrev(index => {
            const query = this.state.autocompleteResults[index];
            this.setState({
              query
            });
          });
        }
        break;
    }
  };

  // RENDER

  render() {
    const { className } = this.props;
    const { autocompleteResults, query } = this.state;

    return (
      <div className={`search ${className || ''}`}>
        <i className="material-icons" onClick={this.handleSearchClicked}>
          search
        </i>

        <input
          ref={ref => {
            if (ref) {
              ref.focus();
            }
            this.inputRef = ref;
          }}
          type="text"
          className="search-input"
          placeholder="Search documents, file names, people..."
          onChange={this.handleInputChanged}
          onKeyDown={this.handleKeyDown}
          value={query || ''}
        />

        {!!query ? (
          <i className="material-icons" onClick={this.handleCloseClicked}>
            close
          </i>
        ) : null}

        {autocompleteResults ? (
          autocompleteResults.length ? (
            <SearchDropdown
              items={autocompleteResults}
              ref={ref => (this.searchDropdownRef = ref)}
            />
          ) : (
            <div>No Results</div>
          )
        ) : null}
      </div>
    );
  }
}

export default Search;
