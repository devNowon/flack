import React from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

import SideItemWrapper from '../side_components/SideItemWrapper.jsx';
import SideAppBar from '../side_components/SideAppBar.jsx';

const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');

class ChannelWrapperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ChannelWrapperComponent';
    this.state = {
      channelArr: [],
    };
    this.handleChnlAddClick = this.handleChnlAddClick.bind(this);
    this.handleChnlItemClick = this.handleChnlItemClick.bind(this);
  }
  componentWillMount() {
    // 채널 리스트 받아오는 코드
    this._getChnlInformation();
  }
  _getChnlInformation() {
    SOCKET.on('roomInformation', (obj) => {
      const CHNL_OBJ =  obj;
      const result = _.keys(CHNL_OBJ).filter((key) => !(_.startsWith(_.trim(key), '/#')));
      console.log('result : ' + result);
      this.setState({channelArr: result});
      console.log('channelArr : ' + this.state.channelArr);
    });
    SOCKET.emit('roomInformation');
  }
  handleChnlAddClick() {
    // 채널 생성 화면 전환
  }
  handleChnlItemClick() {
    // 채널 채팅 화면 전환
  }
  render() {
    return(
     <div>
        <SideAppBar itemLength={this.state.channelArr.length} title="Channel"/>
        <SideItemWrapper channelArr={this.state.channelArr}/>
     </div>
    );
  }
}

export default ChannelWrapperComponent;