import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import ReactDOM from 'react-dom';

export default class MessageComponent extends React.Component {
   componentDidUpdate(){
    ReactDOM.findDOMNode(this).scrollIntoView(); 
  }
  render() {
	"use strict";
	const iconButtonElement = (
	  <IconButton
	    touch={true}
	    tooltip="more"
	    tooltipPosition="bottom-left"
	  >
	    <MoreVertIcon color={Colors.grey400} />
	  </IconButton>
	);

	const rightIconMenu = (
	  <IconMenu iconButtonElement={iconButtonElement}>
	    <MenuItem>Reply</MenuItem>
	    <MenuItem>Forward</MenuItem>
	    <MenuItem>Delete</MenuItem>
	  </IconMenu>
	);

    return (

      <ListItem
      	  leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
          rightIconButton={rightIconMenu}
          primaryText={this.props.author} 
          secondaryText={
            <p style={{height:"auto !important", overflow:"visible", whiteSpace:"wrap"}}>
              {this.props.message} 
            </p> 
          }
          >
      </ListItem>
    );
  }
}
