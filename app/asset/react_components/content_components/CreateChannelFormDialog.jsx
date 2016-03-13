import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

const styles = {
  block: {
    maxWidth: '250px'
  }
}

const channelTypeMessageMap = new Map();
channelTypeMessageMap.set("public", "Anyone on your team can join");
channelTypeMessageMap.set("private", "Restricted to invited members");

class CreateChannelFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CreateChannelFormDialog';
    this.state = {
      channelType: "public"
    }
    this._toggleChannelType = this._toggleChannelType.bind(this);
  }
  _toggleChannelType() {
    let channelType = this.state.channelType;
    this.setState({channelType: channelType === "public" ? "private" : "public"});
    $('.private-desc').toggle();
  }
  _handleCreate() {
    // 채널 만들기 기능 구현할 자리
  }
  render() {
    const actions = [
      <RaisedButton
        label="Create channel"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._handleCreate}
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
            label={channelTypeMessageMap.get(this.state.channelType)}
            defaultToggled={true}
            labelPosition="right"
            style={styles.toggle}
            onToggle={this._toggleChannelType}
          />
        </div>
        <div className="private-desc">
          A private channel is only visible to its members, 
          and only members of a private channel can read or search its contents.
        </div>
        <TextField 
          hintText="# Enter name here" 
          floatingLabelText="Channel name"
          errorText="Name must be 21 characters or less, lower case and cannot contain spaces or perioed"
          fullWidth={true}
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
