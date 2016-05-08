import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import ChannelWrapperComponent from './channel_components/ChannelWrapperComponent.jsx';
import PeopleWrapperComponent from './people_components/PeopleWrapperComponent.jsx';
import SideAppBar from './common_components/SideAppBar.jsx';
import Divider from 'material-ui/lib/divider';

class SideWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideWrapper';
  }
  render() {
    return (
      <LeftNav open={true} docked={true}>
        <SideAppBar
          mySession={this.props.mySession}
          myName={this.props.myName}
        />
        <ChannelWrapperComponent
          handleChnlAddClick={this.props.handleChnlAddClick}
          handleChnlItemClick={this.props.handleChnlItemClick}
          channelArr={this.props.channelArr}
          mySession={this.props.mySession}
          sessionList={-1}
        />
        <Divider />
        <PeopleWrapperComponent
          handlePeopleAddClick={this.props.handlePeopleAddClick}
          handlePeopleItemClick={this.props.handlePeopleItemClick}
          peopleArr={this.props.peopleArr}
          mySession={this.props.mySession}
          sessionList={this.props.sessionList}
        />
      </LeftNav>
    );
  }
}

export default SideWrapper;
