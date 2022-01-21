import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { getLang } from 'components/Language';
import InputText from 'components/Input/Text';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DATA_TYPE_NUMBER } from 'structures/dataTypes.js';
import onMount from './onMount.js';
import onClear from '../onClear.js';
import onChange from '../onChange.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';

let MathInt = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? 0);
	const _onChange1 = React.useCallback((e) => onChange(e, id, 0), [
		id,
	]);
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
		dataTypeValidating: onValidate(DATA_TYPE_NUMBER.id),
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
		<Box my={2}>
			<InputText
				menu
				onMenu={_onMenu1}
				onValue={_onMenu1}
				onDelete={_onClear1}
				onChange={_onChange1}
				value={prop1}
				name="prop-1"
				label={getLang('cmpDialogFuncPropsMathIntValue')}
				placeholder={getLang('cmpDialogFuncPropsMathIntNumb')}
				helperText={getLang('cmpDialogFuncPropsMathIntSelectProp')} />
		</Box>
	</React.Fragment>;
};

MathInt = React.memo(MathInt);
MathInt.defaultProps = {
	id: 0,
};

export default MathInt;
