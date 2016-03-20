import React from 'react';
import SideWrapper from './SideWrapper.jsx';
import ContentWrapper from './ContentWrapper.jsx';
import CreateChannelFormDialog from './content_components/CreateChannelFormDialog.jsx';
import MessageWrapperComponent from './MessageWrapperComponent.jsx';
import io from 'socket.io-client';
import _ from 'lodash';

const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'AppWrapper';
    this.state = {
      openCreateChannelForm: false,
      channelArr: [],
      peopleArr: [],
      mySession:[],
      inputValue: '',
      receivedMessages: [],
      TYPING: false,
    };
    this.handleChnlAddClick = this.handleChnlAddClick.bind(this);
    this.handleChnlItemClick = this.handleChnlItemClick.bind(this);
    this.handlePeopleAddClick = this.handlePeopleAddClick.bind(this);
    this.handlePeopleItemClick = this.handlePeopleItemClick.bind(this);
    this.handleCloseCreateChannelForm = this.handleCloseCreateChannelForm.bind(this);
    this.receiveProcess = this.receiveProcess.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRoomNameInputChange = this.handleRoomNameInputChange.bind(this);
    this.handleRoomNameButtonClick = this.handleRoomNameButtonClick.bind(this);

  }
  handleChnlAddClick() {
    // 채널 생성 화면 전환
    console.log('add clicked');
    this.setState({openCreateChannelForm: true});
  }
  handleChnlItemClick(item) {
    // 채널 채팅 화면 전환
    console.log('채널채팅화면');
    console.log('clicked value: ' + item);
  }
  handlePeopleAddClick() {
    console.log('add clicked');
  }
  handlePeopleItemClick(item) {
    console.log(item);
  }
  handleCloseCreateChannelForm() {
    this.setState({openCreateChannelForm: false});
  }
  componentWillMount() {
    // 채널 리스트 받아오는 코드
    this._getSessionInformation();
    this._getMySession();
  }
  _getMySession() {
    SOCKET.on('mySession', (obj) => {
      if (this.state.mySession.length==0){
        this.setState({mySession: obj});
      }
      console.log(obj);
    });
  }
  _getSessionInformation() {
    SOCKET.on('roomInformation', (obj) => {
      const resultChannel = _.keys(obj).filter((key) => !(_.startsWith(_.trim(key), '/#')));
      this.setState({channelArr: resultChannel});
      const resultPeople = _.keys(obj).filter((key) => (_.startsWith(_.trim(key), '/#')));
      this.setState({peopleArr: resultPeople});
    });
    SOCKET.emit('roomInformation');
  }

  componentDidMount() {
    SOCKET.on('receiveMessage', this.receiveProcess);
    SOCKET.on('typing', (bool) => {
      this.setState({ TYPING: bool });
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
    if (e.key === 'Enter'&&this.state.inputValue!='') { //공백시..
      SOCKET.emit('sendMessage', [this.state.mySession, this.state.inputValue]);
      this.setState({inputValue: ''});
      e.preventDefault();
      return false;
    }else if (e.key === 'Enter'&&this.state.inputValue=='') { //Enter값은 공백으로 안들어감.
      e.preventDefault();
    }
  }
  render() {
    return (
      <div>
        <MessageWrapperComponent
          handleKeyPress={this.handleKeyPress}
          handleInputBlur={this.handleInputBlur}
          handleInputFocus={this.handleInputFocus}
          handleRoomNameButtonClick={this.handleRoomNameButtonClick}
          handleInputChange={this.handleInputChange}
          receiveProcess={this.receiveProcess}
          getRoomInformation={this.getRoomInformation}
          inputValue={this.state.inputValue}
          receivedMessages={this.state.receivedMessages}
          TYPING={this.state.TYPING}
          className="content-wrapper"
        />
        <SideWrapper
          handleChnlAddClick={this.handleChnlAddClick}
          handleChnlItemClick={this.handleChnlItemClick}
          channelArr={this.state.channelArr}
          handlePeopleAddClick={this.handlePeopleAddClick}
          handlePeopleItemClick={this.handlePeopleItemClick}
          peopleArr={this.state.peopleArr}
          mySession={this.state.mySession}
        />
        <CreateChannelFormDialog
          modal={false}
          open={this.state.openCreateChannelForm}
          onRequestClose={this.handleCloseCreateChannelForm}
          handleClose={this.handleCloseCreateChannelForm}
          channelArr={this.state.channelArr}
          socket={SOCKET}
        />
      </div>
    );
  }
}

export default AppWrapper;
