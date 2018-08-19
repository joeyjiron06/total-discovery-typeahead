import React, { Component } from 'react';
import debouncer from '../../util/debouncer';
import { autocomplete } from '../../api/search';
import AsyncModel from '../../util/asyncModel';
import SearchDropdown from './dropdown';
import './index.css';

class Search extends Component {
  state = {
    error: null,
    autocompleteResults: null
  };

  // LIFECYCLE

  UNSAFE_componentWillMount() {
    // this is similar code to the app.js search function. same concept here,
    // we should debounce so we dont hammer the server and need to keep
    // the last valid input
    this.debounceSearch = debouncer(500, query => {
      if (this.autoCompleteModel) {
        this.autoCompleteModel.destroy();
      }

      if (!query) {
        this.setState({
          error: null,
          autocompleteResults: null
        });
      } else {
        this.autoCompleteModel = new AsyncModel(
          autocomplete(query),
          (error, result) => {
            this.autoCompleteModel = null;
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
    if (this.autoCompleteModel) {
      this.autoCompleteModel.destroy();
    }
  }

  // CALLBACKS

  handleInputChanged = event => {
    const text = event.target.value;
    this.setState({ query: text });
    this.debounceSearch(text);
  };

  handleCloseClicked = () => {
    this.setState({
      query: null,
      error: null,
      autocompleteResults: null
    });
  };

  handleSearchClicked = () => {
    if (!this.inputRef || !this.inputRef.value) {
      return;
    }

    if (typeof this.props.onEnterPressed === 'function') {
      this.props.onEnterPressed(this.inputRef.value);
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
    switch (event.key) {
      case 'Enter':
        this.handleSearchClicked();
        break;

      case 'Escape':
        this.setState({
          error: null,
          autocompleteResults: null
        });
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
