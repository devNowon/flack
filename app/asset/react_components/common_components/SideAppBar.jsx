import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
  appBar: {
    // 앱바 스타일 작성
  }
}

class SideAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideAppBar';
  }
  render() {
    return (
      <AppBar 
        title={this.props.title + '(' + this.props.itemLength + ')'}
        iconElementLeft={<i/>}
        iconElementRight={
          <IconButton tooltip={this.props.addToolTip} onClick={this.props.handleAddClick}>
            <FontIcon className="fa fa-plus-circle"/>
          </IconButton>
        }
        style={style.appBar}/>
    );
  }
}

export default SideAppBar;