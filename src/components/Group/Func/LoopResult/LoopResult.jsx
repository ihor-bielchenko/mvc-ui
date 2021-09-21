import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import SelectFormat from 'components/Select/Format';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import * as format from 'structures/format.js';
import typeFormatValidating from 'utils/typeFormatValidating.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onClear from '../onClear.js';
import onChange from '../onChange.js';
import onSelect from './onSelect.js';
import onMount from './onMount.js';

const _onChangeByLogic2 = (scriptId) => (e, sourceScriptId, typeId, id) => {
	return onChangeByLogic(e, scriptId, typeId, id, '2', sourceScriptId);
};
const _load = (formatId) => () => {
	switch (formatId) {
		case format.FORMAT_STR.id:
		default:
			return import('components/Input/Text');

		case format.FORMAT_NUM.id:
			return import('components/Input/Numeric');

		case format.FORMAT_ARR.id:
		case format.FORMAT_BOOL.id:
			return import('components/Input/Logic');

		// case format.FORMAT_BOOL.id:
		// 	return import('components/Input/Bool');
	}
};

let LoopResult = ({ 
	scriptId,
	id, 
}) => {
	const prop1 = useSelector((state) => typeof state.func[scriptId].props['1'] === 'undefined'
		? ''
		: Number(state.func[scriptId].props['1']));
	const prop2 = useSelector((state) => state.func[scriptId].props['2'] || '');
	const _onSelect1 = React.useCallback((e) => onSelect(e, scriptId, '1'), [
		scriptId,
	]);
	const _onChange2 = React.useCallback((e) => onChange(e, scriptId, '2'), [
		scriptId,
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, scriptId, '2'), [
		scriptId,
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: _onChangeByLogic2(scriptId),
		formatValidating: typeFormatValidating(prop1, true),
	})(e), [
		scriptId,
		prop1,
	]);
	const Component = React.useMemo(() => React.lazy(_load(prop1)), [
		prop1,
	]);
	
	React.useEffect(() => {
		!(id > 0) && onMount(scriptId);
	}, [
		scriptId,
		id,
	]);

	return <React.Fragment>
		<Box my={2}>
			<SelectFormat
				onSelect={_onSelect1}
				value={prop1}
				name="prop-1" />
		</Box>
		<Box my={2}>
			<Component
				menu
				onMenu={_onMenu2}
				onValue={_onMenu2}
				onDelete={_onClear2}
				onChange={_onChange2}
				defaultValue={prop2}
				name="prop-2"
				label="Значение по умолчанию" />
		</Box>
	</React.Fragment>;
};

LoopResult = React.memo(LoopResult);
LoopResult.defaultProps = {
	scriptId: 0,
	id: 0,
};

export default LoopResult;
