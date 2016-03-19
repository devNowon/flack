import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import io from 'socket.io-client';
import $ from 'jquery';
import _ from 'lodash';

const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');

const styles = {
  block: {
    maxWidth: '250px'
  }
}

const channelTypeMessage = {
  public: "Anyone on your team can join",
  private: "Restricted to invited members"
}

class CreateChannelFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CreateChannelFormDialog';
    this._initializeStates = this._initializeStates.bind(this);
    this._initializeStates();
    this._toggleChannelType = this._toggleChannelType.bind(this);
    this._createChannel = this._createChannel.bind(this);
    this._closeForm = this._closeForm.bind(this);
    this._handleChannelNameChange = this._handleChannelNameChange.bind(this);
    this._validateChannelName = this._validateChannelName.bind(this);
  }
  _initializeStates() {
    this.state = {
      channelType: "public",
      channelName: "",
      channelNameValidationMessage: "",
    }
  }
  _toggleChannelType() {
    let channelType = this.state.channelType;
    this.setState({channelType: channelType === "public" ? "private" : "public"});
    $('.private-desc').toggle();
  }
  _createChannel() {
    SOCKET.emit('joinRoom', $('#channelName').val());
    this._initializeStates();
    this._closeForm();
  }
  _closeForm() {
    this._initializeStates();
    this.props.handleClose();
  }
  _handleChannelNameChange(e) {
    let inputedName = e.target.value;
    this.setState({channelName: inputedName, channelNameValidationMessage: ''});
    this._validateChannelName(inputedName);
    this._checkDupChannelName(inputedName);
  }
  _validateChannelName(name) {
    let messageArray = [];
    let mustBeFlag = true;
    if (name.length > 20) {
      messageArray.push(' 21 characters or less');
    }
    if (_.toLower(name) !== name) {
      messageArray.push(messageArray.length == 1 ? ', lower case' : ' lower case');
    }
    if (_.split(name, ' ', 2).length == 2 || _.trim(name) !== name) {
      if (messageArray.length == 0) {
        mustBeFlag = false;
      }
      messageArray.push((mustBeFlag ? ' and' : '') + ' cannot contain spaces or periods');
    }
    if (messageArray.length != 0) {
      let message = '';
      for (let text of messageArray) {
        message += text;
      }
      this.setState({channelNameValidationMessage: 'Names' + (mustBeFlag ? ' must be' : '') + message + '.'});
    }
  }
  _checkDupChannelName(name) {
    const channelArr = this.props.channelArr;
    for (let item of channelArr) {
      if (item === name) {
        this.setState({channelNameValidationMessage: 'Name is duplicated.'});
        break;
      }
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._closeForm}
      />,
      <FlatButton
        label="Create channel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._createChannel}
      />,
    ];
    return (
      <Dialog
        {...this.props}
        actions={actions}
        title={"Create new " + this.state.channelType + " channel"}
      >
        <div style={styles.block}>
          <Toggle
            label={channelTypeMessage[this.state.channelType]}
            defaultToggled={true}
            labelPosition="right"
            style={styles.toggle}
            onToggle={this._toggleChannelType}
            id="channelType"
          />
        </div>
        <div className="private-desc">
          A private channel is only visible to its members, 
          and only members of a private channel can read or search its contents.
        </div>
        <TextField 
          hintText="# Enter name here" 
          floatingLabelText="Channel name"
          errorText={this.state.channelNameValidationMessage}
          fullWidth={true}
          id="channelName"
          onChange={this._handleChannelNameChange}
          value={this.state.channelName}
        />
        <TextField 
          hintText="Search by name" 
          floatingLabelText="Invite others to join (optional)"
          fullWidth={true}
        />
        <TextField 
          hintText="Briefly describe the purpose of this channel" 
          floatingLabelText="Purpose(optional)"
          multiLine={true}
          fullWidth={true}
        />
      </Dialog>
    );
  }
}

export default CreateChannelFormDialog;
