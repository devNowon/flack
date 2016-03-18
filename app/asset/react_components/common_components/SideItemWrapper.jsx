import React from 'react';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import Avatar from 'material-ui/lib/avatar';

let SelectableList = SelectableContainerEnhance(List);

const style = {
  listItem: {
    // 아이템 스타일 작성

  },
  appBar: {
    // 앱바 스타일 작성
  }
}

const styleSideBarButtonRight ={
  position: 'absolute',
  marginTop:-47,
  right:0
}

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(e, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

class SideItemWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideItemWrapper';
  }
  render() {
    // 채널 리스트를 뿌려주는 메소드
    const showItemList = () => {
      let itemDom = [];
      const items = this.props.itemArr; // 아이템 이름 배열
      if (items.length > 0) {
        let index = 1;
        for (let item of items) {
          itemDom.push(<ListItem 
            key={index}
            value={index++}
            leftIcon={this.props.leftIcon}
            primaryText={item}
            onClick={this.props.handleItemClick}
            rightIcon={this.props.rightIcon}
            style={style.listItem}/>);
        } 
      }
      return itemDom;
    }
    return (
      <SelectableList subheader={this.props.title + ' (' + this.props.itemLength + ')'}>
        <IconButton tooltip={this.props.addToolTip}
                    tooltipPosition="bottom-left"
                    onClick={this.props.handleAddClick}
                    style={styleSideBarButtonRight}>
          <FontIcon
            className="material-icons"
            color={Colors.grey500}
            hoverColor={Colors.grey800}
          >
          add_circle_outline
          </FontIcon>       
        </IconButton>
      { showItemList() }
      </SelectableList>
    );
  }
}

export default SideItemWrapper;
