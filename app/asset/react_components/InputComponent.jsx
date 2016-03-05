import React from 'react';

export default class InputComponent extends React.Component {
  render() {
    "use strict";
    return (
      <div>
        <input type='text' value={this.props.inputValue}
          onChange={this.props.handleInputChange}
          onBlur={this.props.handleInputBlur}
          onFocus={this.props.handleInputFocus}
          onKeyPress = {this.props.handleKeyPress} 
        />
      </div>
    );
  }
}
