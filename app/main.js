import ReactDOM from 'react-dom';
import React from 'react';

import MessageWrapperComponent from './asset/react_components/MessageWrapperComponent.jsx';
import ListWrapperComponent from './asset/react_components/ListWrapperComponent.jsx';
import AppWrapper from './asset/react_components/AppWrapper.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// ReactDOM.render(<ListWrapperComponent />, document.getElementById('listPeoples'));
// ReactDOM.render(<MessageWrapperComponent />, document.getElementById('contents'));
ReactDOM.render(<AppWrapper />, document.getElementById('app'));

 