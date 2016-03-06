import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

class SideItem extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideItem';
  }
  render() {
    return (
      <MenuItem
        primaryText={this.props.name}
        leftIcon={this.props.icon}
        onClick={this.props.handleChnlItemClick}/>
    );
  }
}

export default SideItem;
