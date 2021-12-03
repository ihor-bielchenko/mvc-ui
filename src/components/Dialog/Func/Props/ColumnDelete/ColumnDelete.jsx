import React from 'react';
import { useSelector } from 'react-redux';
import SelectColumn from 'components/Select/Column';
import Box from '@material-ui/core/Box';
import Store from 'components/Store';
import SelectTable from 'components/Select/Table';
import { DATA_TYPE_ID } from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onSelect from '../onSelect.js';
import onUnmount from '../onUnmount.js';

let ColumnDelete = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value || '');
	const _onSelect2 = React.useCallback((e) => onSelect(e, id, 1), [
		id,
	]);
	const dbColumnsData = Store().getState().db.columns;
	
	React.useEffect(() => {
		!renderFlag && onMount();
	}, [
		renderFlag,
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
		<Box py={2}>
			<SelectColumn
				name="prop-2"
				value={prop2}
				onSelect={_onSelect2}
				onFilter={(key) => dbColumnsData[key].data_type_id !== DATA_TYPE_ID.id} />
		</Box>
	</React.Fragment>;
};

ColumnDelete = React.memo(ColumnDelete);
ColumnDelete.defaultProps = {
	id: 0,
};

export default ColumnDelete;
