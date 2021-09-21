import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onClear from '../onClear.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onChange from '../onChange.js';

const _onChangeByLogic1 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '1', sourceScriptId);
};
const _onChangeByLogic2 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '2', sourceScriptId);
};
let IfRegExp = ({ scriptId }) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1']);
	const prop2 = useSelector((state) => state.func[scriptId].props['2']);
	const _onClear1 = React.useCallback((e) => onClear(e, scriptId, '1'), [
		scriptId,
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, scriptId, '2'), [
		scriptId,
	]);
	const _onChange1 = React.useCallback((e) => onChange(e, scriptId, '1'), [
		scriptId,
	]);
	const _onChange2 = React.useCallback((e) => onChange(e, scriptId, '2'), [
		scriptId,
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic1(scriptId),
		formatValidating: () => ([
			process.env.FORMAT_STR,
			process.env.FORMAT_NUM,
		]),
	})(e), [
		scriptId,
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic2(scriptId),
		formatValidating: () => ([
			process.env.FORMAT_STR,
		]),
	})(e), [
		scriptId,
	]);

	return <React.Fragment>
		<Box my={2}>
			<InputText
				menu
				onMenu={_onMenu1}
				onDelete={_onClear1}
				onChange={_onChange1}
				defaultValue={prop1}
				name="prop-1"
				label="Значение, которое нужно проверить"
				placeholder="Текст или число"
				helperText="Выберите созданный параметр или укажите значение вручную" />
		</Box>
		<Box 
			mt={6}
			mb={2}>
			<InputText
				menu
				onMenu={_onMenu2}
				onDelete={_onClear2}
				onChange={_onChange2}
				defaultValue={prop2}
				name="prop-2"
				label="Регулярное выражение"
				helperText="Выберите созданный параметр или укажите значение вручную"
				placeholder="/[^a-zA-Zа-яА-Я0-9]/ui" />
		</Box>
	</React.Fragment>;
};

IfRegExp = React.memo(IfRegExp);
IfRegExp.defaultProps = {
	scriptId: 0,
};

export default IfRegExp;
