import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Divider from 'material-ui/lib/divider';

const style = {
  appBar: {
    // 앱바 스타일 작성
  }
}

class SideAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideAppBar';
    console.log(props);
    console.log(props.myName);
  }

  render() {
    return (
      <AppBar 
        title={this.props.myName}
        iconElementLeft={<i/>}
        iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      >
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Help" />
        <Divider />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    }
        style={style.appBar}/>
    );
  }
}

export default SideAppBar;
