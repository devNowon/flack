"use strict";

import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';

const style = {
	appBar: {
		// 앱바 스타일 지정
	}
}

class SideAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideAppBar';
    }
    render() {
        return 
        (
        	<div>
        		<AppBar 
        			title={this.props.title}({this.props.itemLength})
        			iconElementRight={<FlatButton label="add" onClick={this.props.handleChnlAddClick}/>}
        		/>
        	</div>
        );
    }
}

export default SideAppBar;
