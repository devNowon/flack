"use strict";

import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

class SideItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideItem';
    }
    render() {
        return 
        (
        	<div>
	        	<MenuItem
	        		leftIcon={this.props.icon} 
	        		primaryText={this.props.name} 
        			onClick={this.props.handleChnlItemClick}/>
        	</div>
        );
    }
}

export default SideItem;
