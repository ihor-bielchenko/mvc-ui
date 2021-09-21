import React from 'react';
import { 
	Link as ReactLink,
	withRouter, 
} from 'react-router-dom';
import onHandle from './onHandle.js';

let Link = ({ 
	history, 
	children, 
	onClick,
	location,
	match,
	staticContext, 
	...props 
}) => {
	const _onClick = React.useCallback((e) => onHandle(e, history, onClick), [
		history,
		onClick,
	]);

	return <ReactLink { ...props } onClick={_onClick}>
		{children}
	</ReactLink>;
};

Link = React.memo(withRouter(Link));

export default Link;
