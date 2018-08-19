import React, { Component } from 'react';
import './index.css';

class TabBar extends Component {
  state = {
    selectedIndex: 0
  };
  handleItemSelected = (item, index) => () => {
    this.setState({
      selectedIndex: index
    });
    if (typeof this.props.itemSelected === 'function') {
      this.props.itemSelected(item, index);
    }
  };

  render() {
    const { items, className } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className={className}>
        {items.map((item, index) => (
          <div
            key={item.key}
            onClick={this.handleItemSelected(item, index)}
            className={`
          tabbar-item
          ${index === selectedIndex ? 'tabbar-item-selected' : null}
          `}
          >
            {item.title}
          </div>
        ))}
      </div>
    );
  }
}

export default TabBar;
