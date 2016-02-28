import React from 'react';
// import io from 'socket.io-client';
import io from 'socket.io-client';

// const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');
import PeopleComponent from './PeopleComponent.jsx';
import * as request from "superagent";

const SOCKET = io('');
export default class ListWrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {data: [], userID:''};
    this.receiveUser = this.receiveUser.bind(this);
  }
  componentDidMount () {
    SOCKET.on('userID',(e)=>{this.setState({userID: e})});
    request
      .get(this.props.url)
      .end((err, res)=>{
        if (err || !res.ok) {
          alert('yay got ' + JSON.stringify(res.body));
       } else {
          this.setState({data: res.body});
       }
    });
  }

  receiveUser(msg) {
    this.setState({userID: msg});
    console.log(msg);
  }

  render() {
    "use strict";

    let listsOfPeoples = () => {
      let dom = [];
      let people = this.state.data;
      for(var i = 0 ; i < people.length ; i++){
        dom.push(<PeopleComponent name={people[i].name} key={people[i].id} />);
      }
      return dom;
    };

    return (
        <ul>
        <p>{this.state.userID}</p>
          { listsOfPeoples() } 
        </ul>
    )
  }
}
