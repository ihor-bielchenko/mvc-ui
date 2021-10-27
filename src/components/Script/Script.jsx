import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Workspace from './Workspace';

let Script = ({ 
	id,
}) => {
	return <React.Fragment>
		<Header />
		<Sidebar />
		<Workspace />
	</React.Fragment>;
};

Script = React.memo(Script);
Script.defaultProps = {
	id: 0,
};

export default Script;
