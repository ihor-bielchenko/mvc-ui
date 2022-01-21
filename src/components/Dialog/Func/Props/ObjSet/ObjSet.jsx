import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { getLang } from 'components/Language';
import LogicValue from 'components/Input/LogicValue.jsx';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_OBJECT,
	DATA_TYPE_TEXT, 
} from 'structures/dataTypes.js';
import onClear from '../onClear.js';
import onChange from '../onChange.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';
import onMount from './onMount.js';

let ObjSet = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop1Name = useSelector((state) => (((state.script[(prop1 || {}).workspaceId] || {}).data || {})[(prop1 || {}).id] || {}).name ?? '');
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? '');
	const prop3 = useSelector((state) => ((state.jsObject.blocks[0] || [])[2] || {}).value ?? '');
	const _onChange2 = React.useCallback((e) => onChange(e, id, 1), [
		id,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, id, 2), [
		id,
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
		dataTypeValidating: onValidate(DATA_TYPE_OBJECT.id),
	})(e), [
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(1),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
	]);
	const _onMenu3 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(2),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
	]);
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, 1), [
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, 2), [
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
			{prop1
				? <LogicValue 
					chipText={SOURCE_TYPE_SCRIPT.text(prop1Name)}
					onDelete={_onClear1}
					onClick={_onMenu1} />
				: <Button
					variant="outlined"
					color="primary"
					startIcon={<AddIcon fontSize="small" />}
					onClick={_onMenu1}>
					{getLang('cmpDialogFuncPropsObjSetSelectObj')}
			</Button>}
		</Box>
		<Box py={2}>
			<InputText
				menu
				onMenu={_onMenu2}
				onValue={_onMenu2}
				onDelete={_onClear2}
				onChange={_onChange2}
				defaultValue={prop2}
				name="prop-2"
				label={getLang('cmpDialogFuncPropsObjSetKey')}
				placeholder={getLang('cmpDialogFuncPropsObjSetTextOrNumber')}
				helperText={getLang('cmpDialogFuncPropsObjSetSelectProp')} />
		</Box>
		<Box py={2}>
			<InputText
				menu
				onMenu={_onMenu3}
				onValue={_onMenu3}
				onDelete={_onClear3}
				onChange={_onChange3}
				defaultValue={prop3}
				name="prop-3"
				label={getLang('cmpDialogFuncPropsObjSetValue')}
				placeholder={getLang('cmpDialogFuncPropsObjSetTextOrNumber2')}
				helperText={getLang('cmpDialogFuncPropsObjSetSelectProp2')} />
		</Box>
	</React.Fragment>;
};

ObjSet = React.memo(ObjSet);
ObjSet.defaultProps = {
	id: 0,
};

export default ObjSet;
