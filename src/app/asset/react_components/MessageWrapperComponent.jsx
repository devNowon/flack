import React from 'react';
import MessageComponent from './MessageComponent.jsx';
import InputComponent from './InputComponent.jsx';
import LogIn from './login.jsx';

export default class MessageWrapperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MessageWrapperComponent';
    console.log(props);
    console.log(this.state);
  }
 
  render() {
    "use strict";
    let processReceivedMessages = () => {
      let dom = [];
      let messages = this.props.receivedMessages;
      for(var i = 0 ; i < messages.length ; i++){
        dom.push(<MessageComponent message={messages[i]} key={i} />);
      }
      return dom;
    };

    return (
        <div {...this.props}>
          <div> { processReceivedMessages() } </div>
          <InputComponent
            inputValue={this.props.inputValue}
            handleInputChange={this.props.handleInputChange}
            handleInputFocus={this.props.handleInputFocus}
            handleInputBlur={this.props.handleInputBlur}
            handleKeyPress={this.props.handleKeyPress}
          ></InputComponent>
          {this.props.TYPING?<nowInput />:""}

          <div>
            <InputComponent
              inputValue={this.props.roomName}
              handleInputChange={this.props.handleRoomNameInputChange}
              handleButtonClick={this.props.handleRoomNameButtonClick}
              buttonText="enter room"
            />
          </div>
          <button onClick={this.props.getRoomInformation}> Get Room Info </button>
          <LogIn />
        </div>
    );
  }
}

function nowInput() {
  return <div>누군가 입력 중 입니다...</div>;
}