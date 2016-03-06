import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

class SideItem extends React.Component {
<<<<<<< HEAD
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
=======
    constructor(props) {
        super(props);
        this.displayName = 'SideItem';
    }
    render() {

        return (
        	<MenuItem 
        	primaryText={this.props.name} 
        	leftIcon={this.props.icon}  />
        );
    }
>>>>>>> 623b177fb5fa044898d4d024fc78a6e09d123ac8
}

export default SideItem;
 