import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { getLang } from 'components/Language';
import SelectDataType from 'components/Select/DataType';
import SelectTable from 'components/Select/Table';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import dataTypes, {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_ID,
	DATA_TYPE_NULL,
	DATA_TYPE_NUMBER,
	DATA_TYPE_TEXT,
} from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onChange from '../onChange.js';
import onSelect from '../onSelect.js';
import onUnmount from '../onUnmount.js';
import onValidate from '../onValidate.js';
import onValueScript from '../onValueScript.js';
import onCheck from '../onCheck.js';
import onClear from '../onClear.js';

let ColumnCreate = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value || '');
	const prop3 = useSelector((state) => ((state.jsObject.blocks[0] || [])[2] || {}).value ?? '');
	const prop4 = useSelector((state) => ((state.jsObject.blocks[0] || [])[3] || {}).value ?? '');
	const prop5 = useSelector((state) => ((state.jsObject.blocks[0] || [])[4] || {}).value ?? '');
	const _onSelect2 = React.useCallback((e) => onSelect(e, id, 1), [
		id,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, id, 2), [
		id,
	]);
	const _onChange4 = React.useCallback((e) => onChange(e, id, 3), [
		id,
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, 2), [
	]);
	const _onClear4 = React.useCallback((e) => onClear(e, 3), [
	]);
	const _onMenu3 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(2),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
	]);
	const _onMenu4 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(3),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
	]);

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
			<SelectDataType
				required
				name="prop-2"
				value={prop2 === DATA_TYPE_ID.id
					? DATA_TYPE_NUMBER.id
					: prop2}
				onSelect={_onSelect2}
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
				onMenu={_onMenu3}
				onValue={_onMenu3}
				onDelete={_onClear3}
				onChange={_onChange3}
				defaultValue={prop3}
				name="prop-3"
				label={getLang('cmpDialogFuncPropsColumnCreateNameField')}
				placeholder={getLang('cmpDialogFuncPropsColumnCreateText')}
				helperText={getLang('cmpDialogFuncPropsColumnCreateSelectProp')} />
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
				label={getLang('cmpDialogFuncPropsColumnCreateDescrip')}
				placeholder={getLang('cmpDialogFuncPropsColumnCreateText2')}
				helperText={getLang('cmpDialogFuncPropsColumnCreateSelectProp2')} />
		</Box>
		<Box py={2}>
			<FormControlLabel
				name="prop-5"
				label={getLang('cmpDialogFuncPropsColumnCreateFieldRequired')}
				control={<Checkbox 
					checked={Boolean(Number(prop5))}
					onChange={onCheck(4)} />} />
		</Box>
	</React.Fragment>;
};

ColumnCreate = React.memo(ColumnCreate);
ColumnCreate.defaultProps = {
	id: 0,
};

export default ColumnCreate;
