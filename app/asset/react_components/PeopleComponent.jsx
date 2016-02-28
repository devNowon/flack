import React from 'react';

export default class PeopleComponent extends React.Component {
  render() {
	"use strict";
    return (
      <li>
        {this.props.name}
      </li>
    )
  }
}