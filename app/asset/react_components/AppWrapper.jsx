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
      contentComponent: MessageWrapperComponent,
      openCreateChannelForm: false,
      channelArr: [],
      peopleArr: [],
      mySession:[]
    };
    this.handleChnlAddClick = this.handleChnlAddClick.bind(this);
    this.handleChnlItemClick = this.handleChnlItemClick.bind(this);
    this.handlePeopleAddClick = this.handlePeopleAddClick.bind(this);
    this.handlePeopleItemClick = this.handlePeopleItemClick.bind(this);
    this.handleCloseCreateChannelForm = this.handleCloseCreateChannelForm.bind(this);
  }
  handleChnlAddClick() {
    // 채널 생성 화면 전환
    console.log('add clicked');
    this.setState({openCreateChannelForm: true});
  }
  handleChnlItemClick() {
    // 채널 채팅 화면 전환
    console.log('채널채팅화면');
    console.log('clicked value: ' + this.props.value);
  }
  handlePeopleAddClick() {
    // 채널 생성 화면 전환
    console.log('add clicked');
  }
  handlePeopleItemClick(e) {
    // 채널 채팅 화면 전환
    console.log('clicked value: ' + this.props.value);
    console.log(e);
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
      this.setState({mySession: obj});
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

  render() {
    return (
      <div>
        <ContentWrapper
          className="content-wrapper"
          contentComponent={this.state.contentComponent}
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
        />
      </div>
    );
  }
}

export default AppWrapper;
