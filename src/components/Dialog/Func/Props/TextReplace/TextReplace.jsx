import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onClear from '../onClear.js';
import onChange from '../onChange.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';

let TextReplace = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? '');
	const prop3 = useSelector((state) => ((state.jsObject.blocks[0] || [])[2] || {}).value ?? '');
	const _onChange1 = React.useCallback((e) => onChange(e, id, 0), [
		id,
	]);
	const _onChange2 = React.useCallback((e) => onChange(e, id, 1), [
		id,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, id, 2), [
		id,
	]);
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, 1), [
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, 2), [
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
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

	React.useEffect(() => {
		!renderFlag && onMount();
	}, [
		renderFlag,
	]);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box my={2} />
		<Grid 
			container
			spacing={3}>
			<Grid
				item
				xs={12}>
				<InputText
					menu
					onMenu={_onMenu1}
					onValue={_onMenu1}
					onDelete={_onClear1}
					onChange={_onChange1}
					defaultValue={prop1}
					name="prop-1"
					label="Текст, в котором нужно выполнить замену"
					placeholder="Текст"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			<Grid
				item
				xs={6}>
				<InputText
					menu
					onMenu={_onMenu2}
					onValue={_onMenu2}
					onDelete={_onClear2}
					onChange={_onChange2}
					defaultValue={prop2}
					name="prop-2"
					label="Что заменить"
					placeholder="Текст или регулярное выражение"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
			<Grid
				item
				xs={12}>
				<InputText
					menu
					onMenu={_onMenu3}
					onValue={_onMenu3}
					onDelete={_onClear3}
					onChange={_onChange3}
					defaultValue={prop3}
					name="prop-3"
					label="На что заменить"
					placeholder="Текст"
					helperText="Выберите созданный параметр или укажите значение вручную" />
			</Grid>
		</Grid>
	</React.Fragment>;
};

TextReplace = React.memo(TextReplace);
TextReplace.defaultProps = {
	id: 0,
};

export default TextReplace;
