"use strict";

import React from 'react';
import io from 'socket.io-client';

import SideAppBar from './SideAppBar.jsx';
import SideItemWrapper from '../side_components/SideItemWrapper.jsx';

const SOCKET = io('http://murmuring-ridge-75162.herokuapp.com/');

class ChannelWrapperComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ChannelWrapperComponent';
        this.handleChnlAddClick = this.handleChnlAddClick.bind(this);
        this.handleChnlElementClick = this.handleChnlElementClick.bind(this);
    }
    componentDidMount() {
    	// 채널 리스트 받아오는 코드
    }
    handleChnlAddClick() {
    	// 채널 생성 화면 전환
    }
    handleChnlItemClick() {
    	// 채널 채팅 화면 전환
    }
    render() {
        return 
        (
        	<div>
        		<SideAppBar 
        			title="Channels" 
        			itemLength={this.props.channelArr.length} 
        			handleChnlAddClick={this.props.handleChnlAddClick}/>
        		<SideItemWrapper channelArr={this.props.channelArr}/>
        	</div>
        );
    }
}

export default ChannelWrapperComponent;