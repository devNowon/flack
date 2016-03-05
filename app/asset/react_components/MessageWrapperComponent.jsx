import React from 'react';
import io from 'socket.io-client';

import MessageComponent from './MessageComponent.jsx';
import InputComponent from './InputComponent.jsx';

const SOCKET = io('');

export default class MessageWrapperComponent extends React.Component {
  constructor() {
    super();
    this.state = {  inputValue: '',
                    receivedMessages: [],
                    TYPING: false,
                  };
    this.receiveProcess = this.receiveProcess.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRoomNameInputChange = this.handleRoomNameInputChange.bind(this);
    this.handleRoomNameButtonClick = this.handleRoomNameButtonClick.bind(this);
  }
 
  componentDidMount() {
    SOCKET.on('receiveMessage', this.receiveProcess);
    SOCKET.on('typing', (bool) => {
      this.setState({ TYPING: bool });
    });
    SOCKET.on('roomInformation', (obj) => {
      console.log(obj);
    });
  }

  getRoomInformation() {
    SOCKET.emit('roomInformation');
  }

  receiveProcess(msg) {
    let receivedMessages = this.state.receivedMessages.slice();
    receivedMessages.push(msg);
    this.setState({ receivedMessages: receivedMessages });
  }


  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleRoomNameInputChange(e) {
    this.setState({ roomName: e.target.value });
  }

  handleRoomNameButtonClick() {
    SOCKET.emit('joinRoom', this.state.roomName);
  }

  handleInputFocus() {
    SOCKET.emit('typing', true);
  }

  handleInputBlur() {
    SOCKET.emit('typing', false);
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      SOCKET.emit('sendMessage', this.state.inputValue);
      this.setState({inputValue: ''});
    }
  }
  render() {
    "use strict";
    let processReceivedMessages = () => {
      let dom = [];
      let messages = this.state.receivedMessages;
      for(var i = 0 ; i < messages.length ; i++){
        dom.push(<MessageComponent message={messages[i]} key={i} />);
      }
      return dom;
    };

    return (
        <div>
          <div> { processReceivedMessages() } </div>
          <InputComponent
            inputValue={this.state.inputValue}
            handleInputChange={this.handleInputChange}
            handleInputFocus={this.handleInputFocus}
            handleInputBlur={this.handleInputBlur}
            handleKeyPress={this.handleKeyPress}
          ></InputComponent>
          {this.state.TYPING?<nowInput />:""}

          <div>
            <InputComponent
              inputValue={this.state.roomName}
              handleInputChange={this.handleRoomNameInputChange}
              handleButtonClick={this.handleRoomNameButtonClick}
              buttonText="enter room"
            />
          </div>
          <button onClick={this.getRoomInformation}> Get Room Info </button>
        </div>
    )
  }
}

function nowInput() {
  return <div>누군가 입력 중 입니다...</div>;
}