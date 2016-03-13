import React from 'react';
import SideWrapper from './SideWrapper.jsx';
import ContentWrapper from './ContentWrapper.jsx';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'AppWrapper';
  }
  render() {
    return (
      <div>
        <ContentWrapper
          className="content-wrapper"
        />
        <SideWrapper
        />
      </div>
    );
  }
}

export default AppWrapper;
