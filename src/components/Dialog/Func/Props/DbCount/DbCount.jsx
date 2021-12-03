import React from 'react';
import { useSelector } from 'react-redux';
import SelectTable from 'components/Select/Table';
import Box from '@material-ui/core/Box';
import onMount from './onMount.js';
import onUnmount from '../onUnmount.js';

let DbCount = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	
	React.useEffect(() => {
		!renderFlag && onMount();
	}, [
		renderFlag,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box my={2}>
			<SelectTable
				disabled
				name="prop-1"
				value={1} />
		</Box>
	</React.Fragment>;
};

DbCount = React.memo(DbCount);
DbCount.defaultProps = {
	id: 0,
};

export default DbCount;
