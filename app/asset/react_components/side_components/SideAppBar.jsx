import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';

class SideAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideAppBar';
    }
    render() {

        return (
        	<AppBar 
        		title={this.props.title + '(' + this.props.itemLength + ')'}
        		iconElementRight={<FlatButton label="add" />}/>
        );
    }
}

export default SideAppBar;
