import React from 'react';
import SideItemWrapper from '../common_components/SideItemWrapper.jsx';
import SideAppBar from '../common_components/SideAppBar.jsx';
import FontIcon from 'material-ui/lib/font-icon';

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
        <SideAppBar
          itemLength={this.props.channelArr.length}
          title="CHANNELS"
          addToolTip="Add Channel"
          handleAddClick={this.props.handleChnlAddClick}/>
        <SideItemWrapper
          itemArr={this.props.channelArr}
          leftIcon={<FontIcon
              className="fa fa-hashtag fa-1"
              style={style.leftIcon}
              />}
          handleItemClick={this.props.handleChnlItemClick}/>
     </div>
    );
  }
}

export default ChannelWrapperComponent;