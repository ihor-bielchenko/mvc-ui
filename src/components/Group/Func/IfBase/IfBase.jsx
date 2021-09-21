import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SelectOperatorIf from 'components/Select/OperatorIf';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onClear from '../onClear.js';
import onSelect from '../onSelect.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onChange from '../onChange.js';
import onMount from './onMount.js';

const _onChangeByLogic1 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '1', sourceScriptId);
};
const _onChangeByLogic3 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '3', sourceScriptId);
};
let IfBase = ({ 
	scriptId,
	id, 
}) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1']);
	const prop2 = useSelector((state) => state.func[scriptId].props['2'] || '');
	const prop3 = useSelector((state) => state.func[scriptId].props['3']);
	const _onClear1 = React.useCallback((e) => onClear(e, scriptId, '1'), [
		scriptId,
	]);
	const _onClear3 = React.useCallback((e) => onClear(e, scriptId, '3'), [
		scriptId,
	]);
	const _onChange1 = React.useCallback((e) => onChange(e, scriptId, '1'), [
		scriptId,
	]);
	const _onChange3 = React.useCallback((e) => onChange(e, scriptId, '3'), [
		scriptId,
	]);
	const _onSelect2 = React.useCallback((e) => onSelect(e, scriptId, '2'), [
		scriptId,
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic1(scriptId),
		formatValidating: () => ([
			process.env.FORMAT_STR,
			process.env.FORMAT_NUM,
			process.env.FORMAT_EMPTY,
		]),
	})(e), [
		scriptId,
	]);
	const _onMenu3 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic3(scriptId),
		formatValidating: () => ([
			process.env.FORMAT_STR,
			process.env.FORMAT_NUM,
			process.env.FORMAT_EMPTY,
		]),
	})(e), [
		scriptId,
	]);

	React.useEffect(() => {
		!(id > 0) && onMount(scriptId);
	}, [
		scriptId,
		id,
	]);

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
					onSelect={_onSelect2}
					value={prop2} />
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
	scriptId: 0,
	id: 0,
};

export default IfBase;
