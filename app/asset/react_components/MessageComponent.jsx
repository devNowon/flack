"use strict";

import React from 'react';

export default class MessageComponent extends React.Component {
  render() {
    return (
      <div>
        {this.props.message}
      </div>
    )
  }
}