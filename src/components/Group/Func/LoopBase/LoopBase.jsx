import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputNumeric from 'components/Input/Numeric';
import Script from 'components/Script';
import onDialog from 'components/Dialog/onDialog.js';
import { SCRIPT_LOOP } from 'consts/script.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onClear from '../onClear.js';
import onChange from '../onChange.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onMount from './onMount.js';

let LoopBase = ({ 
	scriptId,
	id,
}) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1']);
	const prop2 = useSelector((state) => state.func[scriptId].props['2'] || '');
	const _onClear1 = React.useCallback((e) => onClear(e, scriptId, '1'), [
		scriptId,
	]);
	const _onChange1 = React.useCallback((e) => onChange(e, scriptId, '1'), [
		scriptId,
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: (e, sourceScriptId, typeId, id) => onChangeByLogic(e, scriptId, typeId, id, '1', sourceScriptId),
		formatValidating: () => ([
			process.env.FORMAT_STR,
			process.env.FORMAT_NUM,
			process.env.FORMAT_EMPTY,
		]),
	})(e), [
		scriptId,
	]);

	React.useEffect(() => {
		!(id > 0) && onMount(scriptId, id);
	}, [
		scriptId,
		id,
	]);

	return <React.Fragment>
		<InputNumeric
			menu
			onMenu={_onMenu1}
			onValue={_onMenu1}
			onDelete={_onClear1}
			onChange={_onChange1}
			defaultValue={prop1}
			name="prop-1"
			label="Количество итераций"
			placeholder="максимум 9999"
			helperText="Выберите созданный параметр или укажите значение вручную" />
		<Typography
			component="div"
			variant="caption"
			color="textSecondary"
			style={{
				margin: '24px 0 0 14px',
			}}>
			Зацикленная программа:
		</Typography>
		<Box 
			style={{ 
				border: '1px solid rgba(0, 0, 0, .12)', 
				borderRadius: 5,
				padding: '8px 0 24px',
			}}>
			{prop2 > 0
				? <Script 
					type={SCRIPT_LOOP}
					scriptId={prop2} />
				: <React.Fragment />}
		</Box>
	</React.Fragment>;
};

LoopBase = React.memo(LoopBase);
LoopBase.defaultProps = {
	scriptId: 0,
	id: 0,
};

export default LoopBase;

