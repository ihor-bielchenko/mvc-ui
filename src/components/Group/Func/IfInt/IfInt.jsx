import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import InputNumeric from 'components/Input/Numeric';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onClear from '../onClear.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onChange from '../onChange.js';

const _onChangeByLogic1 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '1', sourceScriptId);
};
let IfInt = ({ scriptId }) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1']);
	const _onClear1 = React.useCallback((e) => onClear(e, scriptId, '1'), [
		scriptId,
	]);
	const _onChange1 = React.useCallback((e) => onChange(e, scriptId, '1'), [
		scriptId,
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic1(scriptId),
		formatValidating: () => ([
			process.env.FORMAT_NUM,
		]),
	})(e), [
		scriptId,
	]);

	return <React.Fragment>
		<Box mt={2} />
		<InputNumeric
			menu
			onMenu={_onMenu1}
			onDelete={_onClear1}
			onChange={_onChange1}
			defaultValue={prop1}
			name="prop-1"
			label="Значение"
			placeholder="Число"
			helperText="Выберите созданный параметр или укажите значение вручную" />
	</React.Fragment>;
};

IfInt = React.memo(IfInt);
IfInt.defaultProps = {
	scriptId: 0,
};

export default IfInt;
