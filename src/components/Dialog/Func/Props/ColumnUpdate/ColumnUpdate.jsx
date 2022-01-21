import React from 'react';
import { useSelector } from 'react-redux';
import SelectColumn from 'components/Select/Column';
import Box from '@material-ui/core/Box';
import Store from 'components/Store';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getLang } from 'components/Language';
import SelectDataType from 'components/Select/DataType';
import SelectTable from 'components/Select/Table';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_NULL,
	DATA_TYPE_NUMBER,
	DATA_TYPE_TEXT,
} from 'structures/dataTypes.js';
import onChange from '../onChange.js';
import onUnmount from '../onUnmount.js';
import onValidate from '../onValidate.js';
import onValueScript from '../onValueScript.js';
import onCheck from '../onCheck.js';
import onClear from '../onClear.js';
import onSelect from '../onSelect.js';
import onMount from './onMount.js';
import onSelectLocal from './onSelect.js';

let ColumnUpdate = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value || '');
	const prop3 = useSelector((state) => (((state.jsObject.blocks[0] || [])[2] || {}).value 
		|| (state.db.columns[prop2] || {}).data_type_id)
		|| '');
	const prop4 = useSelector((state) => (((state.jsObject.blocks[0] || [])[3] || {}).value 
		|| (state.db.columns[prop2] || {}).name)
		?? '');
	const prop5 = useSelector((state) => (((state.jsObject.blocks[0] || [])[4] || {}).value 
		|| (state.db.columns[prop2] || {}).description)
		?? '');
	const prop6 = useSelector((state) => Number((((state.jsObject.blocks[0] || [])[5] || {}).value 
		?? (state.db.columns[prop2] || {}).required)
		?? ''));
	const _onSelect2 = React.useCallback((e) => onSelectLocal(e, id), [
		id,
	]);
	const _onSelect3 = React.useCallback((e) => onSelect(e, id, 2), [
		id,
	]);
	const _onChange4 = React.useCallback((e) => onChange(e, id, 3), [
		id,
	]);
	const _onChange5 = React.useCallback((e) => onChange(e, id, 4), [
		id,
	]);
	const _onClear4 = React.useCallback((e) => onClear(e, 3), [
	]);
	const _onClear5 = React.useCallback((e) => onClear(e, 4), [
	]);
	const _onMenu4 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(3),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
	]);
	const _onMenu5 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(4),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
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
		{prop2 > 0
			? <React.Fragment>
				<Box 
					mt={4}
					mb={2}>
					<SelectDataType
						required
						name="data_type_id"
						value={prop3 === DATA_TYPE_ID.id
							? DATA_TYPE_NUMBER.id
							: prop3}
						onSelect={_onSelect3}
						onFilter={(key) => {
							return dataTypes[key].id !== DATA_TYPE_ATOMIC.id
								&& dataTypes[key].id !== DATA_TYPE_OBJECT.id
								&& dataTypes[key].id !== DATA_TYPE_ARRAY.id
								&& dataTypes[key].id !== DATA_TYPE_ID.id
								&& dataTypes[key].id !== DATA_TYPE_NULL.id;
						}} />
				</Box>
				<Box py={2}>
					<InputText
						required
						menu
						onMenu={_onMenu4}
						onValue={_onMenu4}
						onDelete={_onClear4}
						onChange={_onChange4}
						defaultValue={prop4}
						name="prop-4"
						label={getLang('cmpDialogFuncPropsColumnUpdateName')}
						placeholder={getLang('cmpDialogFuncPropsColumnUpdateText')}
						helperText={getLang('cmpDialogFuncPropsColumnUpdateSelectProp')} />
				</Box>
				<Box py={2}>
					<InputText
						required
						menu
						onMenu={_onMenu5}
						onValue={_onMenu5}
						onDelete={_onClear5}
						onChange={_onChange5}
						defaultValue={prop5}
						name="prop-5"
						label={getLang('cmpDialogFuncPropsColumnUpdateDescr')}
						placeholder={getLang('cmpDialogFuncPropsColumnUpdateText2')}
						helperText={getLang('cmpDialogFuncPropsColumnUpdateSelectProp2')} />
				</Box>
				<Box py={2}>
					<FormControlLabel
						name="prop-6"
						label={getLang('cmpDialogFuncPropsColumnUpdateFieldRequired')}
						control={<Checkbox 
							checked={Boolean(prop6)}
							onChange={onCheck(5)} />} />
				</Box>
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

ColumnUpdate = React.memo(ColumnUpdate);
ColumnUpdate.defaultProps = {
	id: 0,
};

export default ColumnUpdate;
