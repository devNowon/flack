import React from 'react';
// import io from 'socket.io-client';
import io from 'socket.io-client';

// const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');
import PeopleComponent from './PeopleComponent.jsx';
import * as request from "superagent";

const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com');
export default class ListWrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {data: []};
    this.handleFormDirect = this.handleFormDirect.bind(this);
    // this.receiveUser = this.receiveUser.bind(this);
  }
  componentDidMount () {
    // SOCKET.on('userID',(e)=>{this.setState({userID: e})});
    // request
    //   .get(this.props.url)
    //   .end((err, res)=>{
    //     if (err || !res.ok) {
    //       alert('yay got ' + JSON.stringify(res.body));
    //    } else {
    //       this.setState({data: res.body});
    //    }
    // });
    
    SOCKET.on('roomInformation', (obj) => {
      this.setState({data: obj});
    });
    SOCKET.on('mySession', (obj) => {
      this.setState({data: obj});
    });
  }
  
  handleFormDirect(e) {
    console.log(e);
  }

  // receiveUser(msg) {
  //   console.log(msg)
  //   let receivedUsers = this.state.data.slice();
  //   receivedUsers.push(msg);
  //   this.setState({ data: receivedUsers });
  // }
  
  render() { 
    "use strict";

    let listsOfPeoples = () => {
      let dom = [];
      let people = this.state.data;
      console.log(Object.keys(people).length);
      for(var i = 0 ; i < Object.keys(people).length ; i++){
        if (Object.keys(people)[i].slice('#')[0]=='/'){
          dom.push(<PeopleComponent 
            tempFunction={this.handleFormDirect.bind(this, Object.keys(people)[i])} 
            name={Object.keys(people)[i]} 
            key={i} />);
        }
      }
      return dom;
    };
        // <p>{this.state.userID}</p>

    return (
        <ul>
          { listsOfPeoples() } 
        </ul>
    )
  }
}
