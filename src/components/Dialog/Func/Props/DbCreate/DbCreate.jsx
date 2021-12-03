import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import SelectTable from 'components/Select/Table';
import onDialog from 'components/Dialog/onDialog.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onChange from '../onChange.js';
import onClear from '../onClear.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';

let Column = ({
	id,
	index,
}) => {
	const required = useSelector((state) => (state.db.columns[id] || {}).required);
	const dataTypeId = useSelector((state) => (state.db.columns[id] || {}).data_type_id);
	const columnKey = useSelector((state) => (state.db.columns[id] || {}).name);
	const value = useSelector((state) => ((state.jsObject.blocks[0] || [])[index] || {}).value ?? '');
	const sourceId = useSelector((state) => ((state.jsObject.blocks[0] || [])[index] || {}).id);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);
	const _onChange = React.useCallback((e) => onChange(e, sourceId, index), [
		sourceId,
		index,
	]);
	const _onClear = React.useCallback((e) => onClear(e, index), [
		index,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(index),
		dataTypeValidating: onValidate(dataTypeId),
	})(e), [
		index,
		dataTypeId,
	]);

	return <Box py={2}>
		<React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component
				menu
				onMenu={_onMenu}
				onValue={_onMenu}
				onDelete={_onClear}
				required={required}
				disabled={dataTypeId === DATA_TYPE_ID.id}
				name={id.toString()}
				value={value}
				onChange={_onChange}
				label={columnKey +' ('+ dataTypes[dataTypeId === DATA_TYPE_ID.id
					? DATA_TYPE_NUMBER.id
					: dataTypeId].text() +')'} />
		</React.Suspense>
	</Box>;
};
Column = React.memo(Column);
Column.defaultProps = {
	id: 0,
	index: 0,
};

let DbCreate = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const columns = useSelector((state) => state.db.columns);

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
		<Box>
			{Object
				.keys(columns)
				.map((columnKey, i) => {
					return <React.Fragment key={columns[columnKey].id}>
						<Column
							id={columns[columnKey].id}
							index={i + 1} />
					</React.Fragment>;
			})}
		</Box>
	</React.Fragment>;
};

DbCreate = React.memo(DbCreate);
DbCreate.defaultProps = {
	id: 0,
};

export default DbCreate;
