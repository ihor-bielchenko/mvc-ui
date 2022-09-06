import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import InputText from 'components/Input/Text';
import LogicValue from 'components/Input/LogicValue.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ARRAY,
	DATA_TYPE_NUMBER, 
} from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onChange from '../onChange.js';
import onClear from '../onClear.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';
import { getLang } from 'components/Language';

let ArrSplice = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? '');
	const prop3 = useSelector((state) => ((state.jsObject.blocks[0] || [])[2] || {}).value ?? '');
	const prop4 = useSelector((state) => ((state.jsObject.blocks[0] || [])[3] || {}).value ?? '');
	const prop1Name = useSelector((state) => (((state.script[(prop1 || {}).workspaceId] || {}).data || {})[(prop1 || {}).id] || {}).name ?? '');
	const prop4Name = useSelector((state) => (((state.script[(prop4 || {}).workspaceId] || {}).data || {})[(prop4 || {}).id] || {}).name ?? '');
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
	]);
	const _onChange2 = React.useCallback((e) => onChange(e, id, 1), [
		id,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, id, 2), [
		id,
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, 1), [
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, 2), [
	]);
	const _onClear4 = React.useCallback((e) => onClear(e, 3), [
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
		dataTypeValidating: onValidate(DATA_TYPE_ARRAY.id),
	})(e), [
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(1),
		dataTypeValidating: onValidate(DATA_TYPE_NUMBER.id),
	})(e), [
	]);
	const _onMenu3 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(2),
		dataTypeValidating: onValidate(DATA_TYPE_NUMBER.id),
	})(e), [
	]);
	const _onMenu4 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(3),
		dataTypeValidating: onValidate(DATA_TYPE_ARRAY.id),
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
		<Box 
			mt={2}
			mb={6}>
			<Typography
				variant="caption"
				color="textSecondary">
				{getLang('DialogFuncContent4Text')}
			</Typography>
			<Box mt="6px">
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
					{getLang('DialogFuncContent3Text')}
				</Button>}
			</Box>
		</Box>
		<Box my={3}>
			<InputText
				menu
				onMenu={_onMenu2}
				onValue={_onMenu2}
				onDelete={_onClear2}
				onChange={_onChange2}
				defaultValue={prop2}
				name="prop-2"
				label={getLang('DialogFuncContent5Text')}
				placeholder={getLang('Num')}
				helperText={getLang('SelectCreatedPar')} />
		</Box>
		<Box my={3}>
			<InputText
				menu
				onMenu={_onMenu3}
				onValue={_onMenu3}
				onDelete={_onClear3}
				onChange={_onChange3}
				defaultValue={prop3}
				name="prop-3"
				label={getLang('DialogFuncContent6Text')}
				placeholder={getLang('TorN')}
				helperText={getLang('SelectCreatedPar')} />
		</Box>
		<Box my={3}>
			<Typography
				variant="caption"
				color="textSecondary">
				{getLang('DialogFuncContent7Text')}
			</Typography>
			<Box mt="6px">
			{prop4
				? <LogicValue 
					chipText={SOURCE_TYPE_SCRIPT.text(prop4Name)}
					onDelete={_onClear4}
					onClick={_onMenu4} />
				: <Button
					variant="outlined"
					color="primary"
					startIcon={<AddIcon fontSize="small" />}
					onClick={_onMenu4}>
					{getLang('DialogFuncContent3Text')}
				</Button>}
			</Box>
		</Box>
	</React.Fragment>;
};

ArrSplice = React.memo(ArrSplice);
ArrSplice.defaultProps = {
	id: 0,
};

export default ArrSplice;
