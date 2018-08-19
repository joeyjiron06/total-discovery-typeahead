import React, { Component } from 'react';
import './index.css';

class Search extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={`search ${className || ''}`}>
        <i className="material-icons search-icon">search</i>

        <input
          ref={ref => ref.focus()}
          type="text"
          className="search-input"
          placeholder="Search documents, file names, people..."
        />
      </div>
    );
  }
}

export default Search;
