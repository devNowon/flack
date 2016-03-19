import React from 'react';
import MessageWrapperComponent from './MessageWrapperComponent.jsx';

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ContentWrapper';
  }
  render() {
    const renderContent = () => {
      const Component = this.props.contentComponent;
      return (
        <Component 
          className={this.props.className}
        />
      );
    }
    return (
      <div>
        { renderContent() }
      </div>
    );
  }
}

export default ContentWrapper;
