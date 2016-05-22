import React from 'react';
import MessageComponent from './MessageComponent.jsx';
import MessageLightComponent from './MessageLightComponent.jsx';
import InputComponent from './InputComponent.jsx';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import List from 'material-ui/lib/lists/list';


export default class MessageWrapperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MessageWrapperComponent';
    console.log(props);
    console.log(this.state);
  }
 
  render() {
    "use strict";
    let processReceivedMessages = () => {
      let dom = [];
      let messages = this.props.receivedMessages;
      var temp = '';
      for(var i = 0 ; i < messages.length ; i++){
        if (temp==messages[i]){
          dom.push(<MessageLightComponent author={messages[i]} message={messages[i]} key={i} />);
        }else{
          dom.push(<MessageComponent author={messages[i]} message={messages[i]} key={i} />);
        }
        temp=messages[i];
      }
      return dom;
    };

    const messageComponentNavbar = () => (
      <Toolbar>
        <ToolbarTitle text={this.props.currentRoom} />
        <ToolbarTitle text="People" />
        <ToolbarGroup firstChild={true} float="left">
          <DropDownMenu value={3}>
            <MenuItem value={1} primaryText="All Broadcasts" />
            <MenuItem value={2} primaryText="All Voice" />
            <MenuItem value={3} primaryText="All Text" />
            <MenuItem value={4} primaryText="Complete Voice" />
            <MenuItem value={5} primaryText="Complete Text" />
            <MenuItem value={6} primaryText="Active Voice" />
            <MenuItem value={7} primaryText="Active Text" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
    return (
        <div {...this.props}>
          <div className="messageComponentNavbar"> { messageComponentNavbar() } </div>
          <List className="messageList"> { processReceivedMessages() } </List>
          <InputComponent
            inputValue={this.props.inputValue}
            handleInputChange={this.props.handleInputChange}
            handleInputFocus={this.props.handleInputFocus}
            handleInputBlur={this.props.handleInputBlur}
            handleKeyPress={this.props.handleKeyPress}
            style={{width:'100%'}}
          ></InputComponent>
          {this.props.TYPING?<nowInput />:""}
        </div>
    );
  }
}

function nowInput() {
  return <div>누군가 입력 중 입니다...</div>;
}