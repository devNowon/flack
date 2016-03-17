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
    };
    this.handleChnlAddClick = this.handleChnlAddClick.bind(this);
    this.handleChnlItemClick = this.handleChnlItemClick.bind(this);
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
  handleCloseCreateChannelForm() {
    this.setState({openCreateChannelForm: false});
  }
  componentWillMount() {
    // 채널 리스트 받아오는 코드
    this._getChnlInformation();
  }
  _getChnlInformation() {
    SOCKET.on('roomInformation', (obj) => {
      const chnlObj =  obj;
      const result = _.keys(chnlObj).filter((key) => !(_.startsWith(_.trim(key), '/#')));
      this.setState({channelArr: result});
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
