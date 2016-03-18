import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import ChannelWrapperComponent from './channel_components/ChannelWrapperComponent.jsx';
import PeopleWrapperComponent from './people_components/PeopleWrapperComponent.jsx';
import ListWrapperComponent from './ListWrapperComponent.jsx';

class SideWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideWrapper';
  }
  render() {
    return (
      <LeftNav open={true} docked={true}>
        <ChannelWrapperComponent
          handleChnlAddClick={this.props.handleChnlAddClick}
          handleChnlItemClick={this.props.handleChnlItemClick}
          channelArr={this.props.channelArr}
        />
        <PeopleWrapperComponent
          handlePeopleAddClick={this.props.handlePeopleAddClick}
          handlePeopleItemClick={this.props.handlePeopleItemClick}
          peopleArr={this.props.peopleArr}
        />
        <ListWrapperComponent
        />
      </LeftNav>
    );
  }
}

export default SideWrapper;
