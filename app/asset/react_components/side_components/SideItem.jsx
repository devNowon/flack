import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

class SideItem extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideItem';
    }
    render() {

        return (
        	<MenuItem 
        	primaryText={this.props.name} 
        	leftIcon={this.props.icon} />
        );
    }
}

export default SideItem;
