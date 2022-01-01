import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Store from 'components/Store';
import SelectTable from 'components/Select/Table';
import DatabaseSearch from 'components/Database/Search';
import onMount from './onMount.js';
import onUnmount from '../onUnmount.js';

let DbDelete = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const filterOperatorId = useSelector((state) => state.jsObject.tempValue.filter_operator_id);
	
	React.useEffect(() => {
		const jsObject = Store().getState().jsObject;
		const blocks = jsObject.blocks;

		jsObject.tempValue.filter = JSON.parse(((blocks[0] || [])[1] || {}).value || '{}');
		jsObject.tempValue.sort = JSON.parse(((blocks[0] || [])[2] || {}).value || '{}');
		jsObject.tempValue.query = JSON.parse(((blocks[0] || [])[3] || {}).value || '{}');
		jsObject.tempValue.filter_operator_id = Number(((blocks[0] || [])[4] || {}).value ?? process.env.OPERATOR_UNION_AND);

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		if (!renderFlag) {
			onMount();
		}
	}, [
		renderFlag,
	]);

	React.useEffect(() => {
		const jsObject = Store().getState().jsObject;
		const blocks = jsObject.blocks;
		
		blocks[0][4].value = filterOperatorId;

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}, [
		filterOperatorId,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box py={2}>
			<SelectTable
				disabled
				value={1} />
		</Box>
		<Box>
			<DatabaseSearch disabledSort />
		</Box>
	</React.Fragment>;
};

DbDelete = React.memo(DbDelete);
DbDelete.defaultProps = {
	id: 0,
};

export default DbDelete;
