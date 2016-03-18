import React from 'react';
import SideItemWrapper from '../common_components/SideItemWrapper.jsx';
import FontIcon from 'material-ui/lib/font-icon';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';

const style = {
  leftIcon: {
    // 아이콘 스타일 작성
  }
}

class ChannelWrapperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ChannelWrapperComponent';
  }
  render() {
    return(
     <div>
        <SideItemWrapper
          itemLength={this.props.channelArr.length}
          title="CHANNELS"
          addToolTip="Add Channel"
          handleAddClick={this.props.handleChnlAddClick}
          itemArr={this.props.channelArr}
          leftIcon={<FontIcon
              className="fa fa-hashtag fa-1"
              style={style.leftIcon}
              />}
          rightIcon={null}
          handleItemClick={this.props.handleChnlItemClick}/>
     </div>
    );
  }
}

export default ChannelWrapperComponent;