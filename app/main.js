import ReactDOM from 'react-dom';
import React from 'react';

import MessageWrapperComponent from './asset/react_components/MessageWrapperComponent.jsx';
import ListWrapperComponent from './asset/react_components/ListWrapperComponent.jsx';

ReactDOM.render(<ListWrapperComponent url="/user/list" />, document.getElementById('listPeoples'));
ReactDOM.render(<MessageWrapperComponent />, document.getElementById('contents'));
 