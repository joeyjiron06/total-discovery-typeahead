import React, { Component } from 'react';
import './index.css';

// this could actually be a more generic component called something like "HighlightableList"
class SearchDropdown extends Component {
  state = {
    highlightIndex: null
  };

  /**
   * @param {function} callback function to be called with new index
   */
  highlightNext(callback) {
    let highlightIndex;

    if (this.state.highlightIndex === null) {
      highlightIndex = 0;
    } else {
      highlightIndex =
        (this.state.highlightIndex + 1) % this.props.items.length;
    }

    this.setState({
      highlightIndex
    });
    callback(highlightIndex);
  }

  /**
   * @param {function} callback function to be called with new index
   */
  highlightPrev(callback) {
    let highlightIndex;

    if (this.state.highlightIndex === 0 || this.state.highlightIndex === null) {
      highlightIndex = this.props.items.length - 1;
    } else {
      highlightIndex =
        this.state.highlightIndex - (1 % this.props.items.length);
    }

    this.setState({
      highlightIndex
    });
    callback(highlightIndex);
  }

  render() {
    const { items } = this.props;
    const { highlightIndex } = this.state;

    return (
      <div className="search-dropdown-list">
        {items.map((text, index) => (
          <div
            key={index}
            data-index={index}
            className={`search-dropdown-item
                  ${
                    highlightIndex === index
                      ? 'search-dropdown-item-hover'
                      : null
                  }
                  `}
          >
            {text}
          </div>
        ))}
      </div>
    );
  }
}

export default SearchDropdown;
