import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import ChannelWrapperComponent from './channel_components/ChannelWrapperComponent.jsx';
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
        />
        <ListWrapperComponent
        />
      </LeftNav>
    );
  }
}

export default SideWrapper;
