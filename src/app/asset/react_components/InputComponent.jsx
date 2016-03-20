import React from 'react';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';

export default class InputComponent extends React.Component {
  render() {
    "use strict";
    return (
      <div className="inputComponent">
        <IconButton
          iconClassName="material-icons" tooltip="bottom-right"
          tooltipPosition="top-right"
        >add_box</IconButton>
        <TextField value={this.props.inputValue}
          onChange={this.props.handleInputChange}
          onBlur={this.props.handleInputBlur}
          onFocus={this.props.handleInputFocus}
          onKeyPress = {this.props.handleKeyPress} 
          multiLine={true}
          rows={1}
          rowsMax={4}
          hintText="입력하세요"
          className="inputFieldComponent"
        />
      </div>
    );
  }
}


