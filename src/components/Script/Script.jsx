import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Workspace from './Workspace';
import onMount from './onMount.js';

let Script = ({ 
	id,
}) => {
	React.useEffect(() => onMount(id), [
		id,
	]);

	return <React.Fragment>
		<Header id={id} />
		<Sidebar id={id} />
		<Workspace id={id} />
	</React.Fragment>;
};

Script = React.memo(Script);
Script.defaultProps = {
	id: 0,
};

export default Script;
