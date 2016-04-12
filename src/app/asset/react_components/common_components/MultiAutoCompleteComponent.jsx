import React from 'react';
import TextField from 'material-ui/lib/text-field';
import Popover from 'material-ui/lib/popover/popover';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import _ from 'lodash';
import $ from 'jquery';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';

class MultiAutoCompleteTextField extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MultiAutoCompleteTextField';
    this.state = {
      open: false,
      textValue: '',
      list: this.props.list,
      onError: false,
      errorOpen: false,
      errorMessage: '',
      selectedValueList: [],
      selectedTextList: [],
      hintText: this.props.hintText,
    }
    this._handleClickItem = this._handleClickItem.bind(this);
    this._handleCloseList = this._handleCloseList.bind(this);
    this._handleClickTextFiled = this._handleClickTextFiled.bind(this);
    this._handleChangeTextField = this._handleChangeTextField.bind(this);
    this._handleCloseError = this._handleCloseError.bind(this);
  }
  _handleClickTextFiled(e) {
    this.setState({
      anchorEl: e.currentTarget,
    });
    if (this.state.onError) {
      this.setState({errorOpen: true});
    } else {
      this.setState({open: true})
    }
  }
  _handleCloseList() {
    this.setState({open: false});
  }
  _handleClickItem(item) {
    let selectedValueList = this.state.selectedValueList;
    let selectedTextList = this.state.selectedTextList;
    selectedValueList.push(item.value);
    selectedTextList.push(item.text);
    this.setState({selectedTextList: selectedTextList, selectedValueList: selectedValueList, hintText: ''});
  }
  _handleChangeTextField(e) {
    this.setState({textValue: e.target.value});
    let list = this.props.list;
    list = list.filter((item) => _.startsWith(item.text, e.target.value));
    if (list.length > 0) {
      this.setState({list: list, onError: false, errorOpen: false, open: true});
    } else {
      this.setState({onError: true, open: false, errorOpen: true, errorMessage: e.target.value});
    }
    if (e.target.value === '') {
      this.setState({list: this.props.list});
    }
  }
  _handleCloseError() {
    this.setState({errorOpen: false});
  }
  render() {
    const renderList = () => {
      let itemDom = [];
      const list = this.state.list;
      let key = 0;
      for (let index in list) {
        itemDom.push(<ListItem
          key={key++}
          value={list[index].value}
          primaryText={list[index].text}
          onClick={this._handleClickItem.bind(this, list[index])}
          />);
      }
      return itemDom;
    }
    const renderBadges = () => {
      let itemDom = [];
      const list = this.state.selectedTextList;
      for (let index in list) {
        itemDom.push(
            <RaisedButton
              label={list[index]}
              labelPosition="before"
              primary={true}
              icon={<FontIcon className="fa fa-times fa-1"/>}
              style={{height: '100%', minWidth: '0px', marginRight: '4px'}}
              className="name-badge"
              key={index}
            />
          );
      }
      return itemDom;
    }
    const getInputPadding = () => {
      let inputPadding = 0;
      $('.name-badge').each(function() {
        inputPadding += $(this).width() + 4;
      });
      if (inputPadding > 0) {
        console.log('textfield clicked');
        $('.text-field').click();
        $('.text-field > input').focus();
      }
      return inputPadding;
    }
    return (
      <div>
        <TextField 
          hintText={this.state.hintText}
          floatingLabelText={this.props.floatingLabelText}
          fullWidth={this.props.fullWidth}
          onClick={this._handleClickTextFiled}
          onChange={this._handleChangeTextField}
          value={this.state.textValue}
          className="text-field"
          inputStyle={{paddingLeft: getInputPadding() + 'px'}}
        />
        <div className="overlay-div" style={{position: 'relative', top: '-36px', width: 'fit-content'}}>
          {renderBadges()}
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this._handleCloseList}
          style={{marginTop: '-20px', width: $('.text-field').width()}}
        >
          <List>
            {renderList()}
          </List>
        </Popover>
        <Popover
          open={this.state.errorOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this._handleCloseError}
          style={{marginTop: '-20px', width: $('.text-field').width()}}
        >
          <div style={{textAlign: 'center', padding: '22px'}}>
            No one found matching <b>{this.state.errorMessage}</b>
          </div>
        </Popover>
      </div>);
  }
}

export default MultiAutoCompleteTextField;
