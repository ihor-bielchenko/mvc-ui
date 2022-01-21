import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { getLang } from 'components/Language';
import LogicValue from 'components/Input/LogicValue.jsx';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DATA_TYPE_ARRAY } from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onClear from '../onClear.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';

let ArrLength = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop1Name = useSelector((state) => (((state.script[(prop1 || {}).workspaceId] || {}).data || {})[(prop1 || {}).id] || {}).name ?? '');
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
		dataTypeValidating: onValidate(DATA_TYPE_ARRAY.id),
	})(e), [
	]);
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
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
		<Box my={2}>
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
					{getLang('cmpDialogFuncPropsArrLengthSeleArr')}
				</Button>}
		</Box>
	</React.Fragment>;
};

ArrLength = React.memo(ArrLength);
ArrLength.defaultProps = {
	id: 0,
};

export default ArrLength;
