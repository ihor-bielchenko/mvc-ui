import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onClear from '../onClear.js';
import onMount from './onMount.js';

let IfLogic = ({ 
	scriptId,
	id, 
}) => {
	const prop1 = useSelector((state) => state.func[scriptId].props['1']);
	const _onClear1 = React.useCallback((e) => onClear(e, scriptId, '1'), [
		scriptId,
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		scriptId,
		onClickEntity: (e, sourceScriptId, typeId, id) => onChangeByLogic(e, scriptId, typeId, id, '1', sourceScriptId),
		formatValidating: () => ([
			process.env.FORMAT_STR,
			process.env.FORMAT_NUM,
			process.env.FORMAT_ARR,
			process.env.FORMAT_BOOL,
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
		<Box 
			pt={2}
			pb={8}
			position="relative">
		{prop1
			? <StyledChip 
				label={SOURCE_SCRIPT.text()}
				onDelete={_onClear1}
				onClick={_onMenu1} />
			: <Button
				onClick={_onMenu1}
				variant="outlined"
				color="primary"
				startIcon={<AddIcon fontSize="small" />}>
				Выбрать параметр из логики
			</Button>}
		</Box>
	</React.Fragment>;
};

IfLogic = React.memo(IfLogic);
IfLogic.defaultProps = {
	scriptId: 0,
	id: 0,
};

export default IfLogic;
