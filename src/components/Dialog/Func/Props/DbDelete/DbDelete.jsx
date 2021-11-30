import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import DatabaseSearch from 'components/Database/Search';
// import dataTypes, {
// 	DATA_TYPE_ID,
// 	DATA_TYPE_NUMBER,
// } from 'structures/dataTypes.js';
// import onMount from './onMount.js';
// import onChange from '../onChange.js';
// import onClear from '../onClear.js';
// import onValueScript from '../onValueScript.js';
// import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';

let DbDelete = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);

	React.useEffect(() => {
		// !renderFlag && onMount();
	}, [
		renderFlag,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box 
			mt={2}
			mb={6}>
			<DatabaseSearch />
		</Box>
	</React.Fragment>;
};

DbDelete = React.memo(DbDelete);
DbDelete.defaultProps = {
	id: 0,
};

export default DbDelete;
