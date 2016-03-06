import React from 'react';

export default class PeopleComponent extends React.Component {

  render() {
	"use strict";
    return (
      <li>
        <span onClick={this.props.tempFunction}>회원정보 {this.props.name}</span>
      </li>
    )
  }
}