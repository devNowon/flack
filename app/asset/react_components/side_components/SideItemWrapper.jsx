"use strict";

import React from 'react';
import SideItem from './SideItem.jsx';
import Menu from 'material-ui/lib/menus/menu';
import FontIcon from 'material-ui/lib/font-icon';

const style = {
	menu : {
		// 메뉴 스타일 작성
	}
}

class SideItemWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'SideItemWrapper';
    }
    render() {
    	// 채널 리스트를 뿌려주는 메소드
    	let showChannelList = () => {
    		let itemDom = [];
    		let channelItems = this.props.channelArr; // 채널 이름 배열
            console.log('channelItems : ' + this.props.channelArr);
    		if (channelItems.length > 0) {
               for (let item of channelItems) {
                    itemDom.push(<SideItem 
                    key={item}
                    icon={<FontIcon
                              className="material-icons face"
                            />} 
                    name={item}
                    handleChnlItemClick={this.props.handleChnlItemClick}></SideItem>);
                } 
            }
    		return itemDom;
    	}
        return (
        	<div>
	        	<Menu style={style.menu}>
	        		{ showChannelList() }
	        	</Menu>
        	</div>
        );
    }
}

export default SideItemWrapper;