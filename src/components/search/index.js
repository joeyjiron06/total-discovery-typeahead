import React, { Component } from 'react';
import debouncer from '../../util/debouncer';
import { autocomplete } from '../../api/search';
import './index.css';

function cancellable(promise, callback) {
  let cancelled = false;

  promise
    .then(data => {
      if (!cancelled) {
        callback(null, data);
      }
    })
    .catch(error => {
      if (!cancelled) {
        callback(error, null);
      }
    });

  return () => {
    cancelled = true;
  };
}

class Search extends Component {
  state = {
    error: null,
    autocompleteResults: null
  };
  UNSAFE_componentWillMount() {
    this.debounceSearch = debouncer(100, query => {
      if (this.cancelAutoComplete) {
        this.cancelAutoComplete();
        this.cancelAutoComplete = null;
      }

      if (!query) {
        this.setState({
          error: null,
          autocompleteResults: null,
          query
        });
      } else {
        this.setState({ query });

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

  handleInputChanged = event => {
    const text = event.target.value;
    this.debounceSearch(text);
  };

  handleCloseClicked = event => {
    this.setState({ query: null, error: null, autocompleteResults: null });
  };

  render() {
    const { className } = this.props;
    const { autocompleteResults, query } = this.state;

    return (
      <div className={`search ${className || ''}`}>
        <i className="material-icons">search</i>

        <input
          ref={ref => ref && ref.focus()}
          type="text"
          className="search-input"
          placeholder="Search documents, file names, people..."
          onChange={this.handleInputChanged}
          value={query || ''}
        />

        {!!query ? (
          <i className="material-icons" onClick={this.handleCloseClicked}>
            close
          </i>
        ) : null}

        {autocompleteResults ? (
          <div className="search-autocomplete-list">
            {autocompleteResults.length ? (
              autocompleteResults.map((text, index) => (
                <div key={index} className="search-autocomplete-item">
                  {text}
                </div>
              ))
            ) : (
              <div>No Results</div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Search;
