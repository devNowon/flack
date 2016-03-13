import React from 'react';
import MessageWrapperComponent from './MessageWrapperComponent.jsx';

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ContentWrapper';
  }
  render() {
    return (
      <div>
        <MessageWrapperComponent
          {...this.props}
        />
      </div>
    );
  }
}

export default ContentWrapper;
