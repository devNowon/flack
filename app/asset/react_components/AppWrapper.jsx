import React from 'react';
import SideWrapper from './SideWrapper.jsx';
import ContentWrapper from './ContentWrapper.jsx';
import CreateChannelFormDialog from './content_components/CreateChannelFormDialog.jsx';
import MessageWrapperComponent from './MessageWrapperComponent.jsx';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'AppWrapper';
    this.state = {
      contentComponent: MessageWrapperComponent,
      openCreateChannelForm: false,
    };
    this.handleChnlAddClick = this.handleChnlAddClick.bind(this);
    this.handleChnlItemClick = this.handleChnlItemClick.bind(this);
    this.handleCloseCreateChannelForm = this.handleCloseCreateChannelForm.bind(this);
  }
  handleChnlAddClick() {
    // 채널 생성 화면 전환
    console.log('add clicked');
    this.setState({openCreateChannelForm: true});
  }
  handleChnlItemClick() {
    // 채널 채팅 화면 전환
    console.log('채널채팅화면');
    console.log('clicked value: ' + this.props.value);
  }
  handleCloseCreateChannelForm() {
    this.setState({openCreateChannelForm: false});
  }
  render() {
    return (
      <div>
        <ContentWrapper
          className="content-wrapper"
          contentComponent={this.state.contentComponent}
        />
        <SideWrapper
          handleChnlAddClick={this.handleChnlAddClick}
          handleChnlItemClick={this.handleChnlItemClick}
        />
        <CreateChannelFormDialog
          modal={false}
          open={this.state.openCreateChannelForm}
          onRequestClose={this.handleCloseCreateChannelForm}
          handleClose={this.handleCloseCreateChannelForm}
        />
      </div>
    );
  }
}

export default AppWrapper;
