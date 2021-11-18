import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SelectOperatorIf from 'components/Select/OperatorIf';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import onMount from './onMount.js';
import onChange from '../onChange.js';
import onSelect from '../onSelect.js';
import onUnmount from '../onUnmount.js';
import onValidate from '../onValidate.js';
import onValueScript from '../onValueScript.js';
import onClear from '../onClear.js';

let IfBase = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value || process.env.OPERATOR_IF_EQUAL);
	const prop3 = useSelector((state) => ((state.jsObject.blocks[0] || [])[2] || {}).value ?? '');
	const _onChange1 = React.useCallback((e) => onChange(e, id, 0), [
		id,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, id, 2), [
		id,
	]);
	const _onSelect2 = React.useCallback((e) => onSelect(e, id, 1), [
		id,
	]);
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, 2), [
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
		dataTypeValidating: onValidate(),
	})(e), [
	]);
	const _onMenu3 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(2),
		dataTypeValidating: onValidate(),
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
		<Box mt={2} />
		<Grid 
			container
			spacing={3}>
			<Grid 
				item
				xs={true}>
				<InputText
					menu
					onMenu={_onMenu1}
					onValue={_onMenu1}
					onDelete={_onClear1}
					onChange={_onChange1}
					defaultValue={prop1}
					name="prop-1"
					label="Первое значение"
					placeholder="Текст или число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			<Grid 
				item
				xs={3}>
				<SelectOperatorIf 
					isNumeric
					name="prop-2"
					value={Number(prop2)}
					onSelect={_onSelect2} />
			</Grid>
			<Grid 
				item
				xs={true}>
				<InputText
					menu
					onMenu={_onMenu3}
					onValue={_onMenu3}
					onDelete={_onClear3}
					onChange={_onChange3}
					defaultValue={prop3}
					name="prop-3"
					label="Второе значение"
					placeholder="Текст или число"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

IfBase = React.memo(IfBase);
IfBase.defaultProps = {
	id: 0,
};

export default IfBase;
