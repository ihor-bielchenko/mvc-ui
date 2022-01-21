import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import DatabaseSearch from 'components/Database/Search';
import Typography from '@material-ui/core/Typography';
import Store from 'components/Store';
import { getLang } from 'components/Language';
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
	const _index = index + 5;
	const required = useSelector((state) => (state.db.columns[id] || {}).required);
	const dataTypeId = useSelector((state) => (state.db.columns[id] || {}).data_type_id);
	const columnKey = useSelector((state) => (state.db.columns[id] || {}).name);
	const value = useSelector((state) => ((state.jsObject.blocks[0] || [])[_index] || {}).value ?? '');
	const sourceId = useSelector((state) => ((state.jsObject.blocks[0] || [])[_index] || {}).id);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);
	const _onChange = React.useCallback((e) => onChange(e, sourceId, _index), [
		sourceId,
		_index,
	]);
	const _onClear = React.useCallback((e) => onClear(e, _index), [
		_index,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(_index),
		dataTypeValidating: onValidate(dataTypeId),
	})(e), [
		_index,
		dataTypeId,
	]);

	return <Box py={2}>
		<React.Suspense fallback={<Typography>{getLang('cmpDialogFuncPropsDBUpdateWait')}</Typography>}>
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

let DbUpdate = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const columns = useSelector((state) => state.db.columns);
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
		<Box py={2}>
			<Typography variant="subtitle1">
				<b>{getLang('cmpDialogFuncPropsDBUpdateNoteUpdate')}</b>
			</Typography>
			<DatabaseSearch disabledSort />
		</Box>
		<Box 
			my={2}>
			<Typography variant="subtitle1">
				<b>{getLang('cmpDialogFuncPropsDBUpdateNewData')}</b>
			</Typography>
			{Object
				.keys(columns)
				.map((columnKey, i) => {
					return <React.Fragment key={columns[columnKey].id}>
						<Column
							id={columns[columnKey].id}
							index={i} />
					</React.Fragment>;
			})}
		</Box>
	</React.Fragment>;
};

DbUpdate = React.memo(DbUpdate);
DbUpdate.defaultProps = {
	id: 0,
};

export default DbUpdate;
