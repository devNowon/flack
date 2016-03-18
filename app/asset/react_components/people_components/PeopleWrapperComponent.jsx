import React from 'react';
import SideItemWrapper from '../common_components/SideItemWrapper.jsx';
import SideAppBar from '../common_components/SideAppBar.jsx';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
  leftIcon: {
    // 아이콘 스타일 작성
  }
}

class PeopleWrapperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'PeopleWrapperComponent';
  }
  render() {
    return(
     <div>
        <SideAppBar
          itemLength={this.props.peopleArr.length}
          title="DIRECT MESSAGES"
          addToolTip="Open A Direct Message"
          handleAddClick={this.props.handlePeopleAddClick}/>
        <SideItemWrapper
          itemArr={this.props.peopleArr}
          leftIcon={<FontIcon
              className="fa fa-at fa-1"
              style={style.leftIcon}
              />}
          handleItemClick={this.props.handlePeopleItemClick}/>
     </div>
    );
  }
}

export default PeopleWrapperComponent;