"use strict";

import React from 'react';
import io from 'socket.io-client';

import MessageComponent from './MessageComponent.jsx';
import InputComponent from './InputComponent.jsx';

const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');

export default class MessageWrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {  inputValue: '',
                    receivedMessages: [],
                    TYPING: false,
                  };
    this.receiveProcess = this.receiveProcess.bind(this);
    this.clickSendButton = this.clickSendButton.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
  }

  componentDidMount() {
    SOCKET.on('chat message',this.receiveProcess);
    SOCKET.on('typing', (bool) => {
      this.setState({TYPING: bool});
    });
  }

  receiveProcess(msg) {
    let receivedMessages = this.state.receivedMessages.slice();
    receivedMessages.push(msg);
    this.setState({receivedMessages: receivedMessages});
  }

  clickSendButton() {
    SOCKET.emit('chat message', this.state.inputValue);
  }

  handleInputChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleInputFocus(){
    SOCKET.emit('typing', true);
  }

  handleInputBlur(e){
    SOCKET.emit('typing', false);
  }

  render() {
    let processReceivedMessages = () => {
      let dom = [];
      let messages = this.state.receivedMessages;
      for(var i = 0 ; i < messages.length ; i++){
        dom.push(<MessageComponent message={messages[i]} key={i} />);
      }
      return dom
    };

    return (
        <div>
          <div> { processReceivedMessages() } </div>
          <InputComponent
            inputValue={this.state.inputValue}
            handleInputChange={this.handleInputChange}
            handleButtonClick={this.clickSendButton}
            handleInputFocus={this.handleInputFocus}
            handleInputBlur={this.handleInputBlur}
            buttonText="send"
          ></InputComponent>
          {this.state.TYPING?<nowInput />:""}
        </div>
    )
  }
}

function nowInput() {
  return <div>누군가 입력 중 입니다...</div>;
}