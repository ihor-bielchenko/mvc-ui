import React from 'react';
import Actions from './Actions.jsx';

let Script = ({ 
	scriptId, 
	isSource,
	withScroll,
	onClickEntity,
	formatValidating,
}) => {
	return <Actions emptyScript />;
};

Script = React.memo(Script);
Script.defaultProps = {
	scriptId: 0,
	isSource: false,
	withScroll: false,
	formatValidating: () => ([]),
};

export default Script;
