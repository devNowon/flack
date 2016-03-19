import React from 'react';

export default class MessageComponent extends React.Component {
  render() {
	"use strict";
    return (
      <div>
        {this.props.message} 
      </div>
    );
  }
}
