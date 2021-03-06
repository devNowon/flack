import React from 'react';
import SideWrapper from './SideWrapper.jsx';
import ContentWrapper from './ContentWrapper.jsx';
import CreateChannelFormDialog from './content_components/CreateChannelFormDialog.jsx';
import MessageWrapperComponent from './MessageWrapperComponent.jsx';
import io from 'socket.io-client';
import _ from 'lodash';
import LogIn from './login.jsx';
import req from 'superagent';

// const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');
const SOCKET = io('http://localhost:3000/');
const ENTER_KEY = 13;

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'AppWrapper';
    this.setAuth = this.setAuth.bind(this);
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
    this.state = {
      openCreateChannelForm: false,
      channelArr: [],
      peopleArr: [],
      mySession:[],
      myID:'',
      myName : '',
      inputValue: '',
      receivedMessages: [],
      TYPING: false,
      loggedIn : false,
      auth : null,
      setAuth : this.setAuth,
      sessionList : []
    };
  }
  setAuth(id){
    console.log(this.state);
    this.setState({auth:true});
    this.setState({myID:id});
    console.log(id);
    req
      .get('/api/getName/'+this.state.myID)
      .end((err, res) => {
        console.log(res.body);
        this.setState({'myName': res.body.nickname});
        console.log(this.state.myName)
      });
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
      let resultChannel = [];
      for (let index in obj) {
        console.log('names: ' + obj[index].name);
        resultChannel.push(obj[index].name);
      }
      this.setState({channelArr: resultChannel});
      // const resultPeople = _.keys(obj).filter((key) => (_.startsWith(_.trim(key), '/#')));
      // this.setState({peopleArr: resultPeople});
    });
    SOCKET.on('sessionList', (obj) => {
      this.setState({sessionList: obj});

    });

    SOCKET.emit('roomInformation');
  }

  componentDidMount() {

    SOCKET.on('receiveMessage', this.receiveProcess);
    SOCKET.on('typing', (bool) => {
      this.setState({ TYPING: bool });
    });
    SOCKET.on('myID', (obj) => {
      console.log(obj);
      this.setState({myID: obj.customId});
    });
    // if (this.state.auth==false){

    // }else{

    // }
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
    if (e.keyCode === ENTER_KEY) { 
      SOCKET.emit('sendMessage', [this.state.mySession, this.state.inputValue.trim()]);
      this.setState({inputValue: ''});
    }
  }
  render() {
    return (
      <div>
        {this.state.auth ? (
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
              myName={this.state.myName}
              sessionList={this.state.sessionList}
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
        ) : (
          <LogIn
            mySession={this.state.mySession}
            SOCKET={SOCKET}
            auth = {this.state.auth}
            setAuth = {this.state.setAuth}
           />
        )}
      </div>
    );
  }
}

export default AppWrapper;
