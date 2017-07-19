import React, { Component } from 'react';

class Filter extends Component {
  handleFilterChange(e) {
    e.preventDefault();

    this.props.filterChangeHandler(e.target.value);
  }

  getOptions() {
    return this.props.options.map((item, i) => <option key={i} value={item}>{item}</option>)
  }

  render() {
    return (
      <label>{this.props.filterLabel}
        <select onChange={this.handleFilterChange.bind(this)}>
          {this.getOptions()}
        </select></label>
    );
  }
}

export default Filter;