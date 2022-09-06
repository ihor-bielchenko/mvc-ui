import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputNumeric from 'components/Input/Numeric';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DATA_TYPE_NUMBER } from 'structures/dataTypes.js';
import onChange from '../onChange.js';
import onClear from '../onClear.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';
import onCheck from '../onCheck.js';
import onMount from './onMount.js';
import { getLang } from 'components/Language';

let ArrSplice = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? '');
	const prop3 = useSelector((state) => ((state.jsObject.blocks[0] || [])[2] || {}).value ?? '');
	const prop4 = useSelector((state) => ((state.jsObject.blocks[0] || [])[3] || {}).value ?? '');
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
			<InputNumeric
				menu
				onMenu={_onMenu1}
				onValue={_onMenu1}
				onDelete={_onClear1}
				onChange={_onChange1}
				defaultValue={prop1}
				name="prop-1"
				label={getLang('DialogFuncContent12Text')}
				placeholder="5"
				helperText={getLang('SelectCreatedPar')} />
		</Box>
		<Box my={1}>
			<FormControlLabel
				control={<Checkbox
					name="prop-2"
					checked={Boolean(Number(prop2))}
					onChange={onCheck(1)} />}
				label={getLang('DialogFuncContent13Text')} />
		</Box>
		<Box mt={1}>
			<FormControlLabel
				control={<Checkbox
					name="prop-3"
					checked={Boolean(Number(prop3))}
					onChange={onCheck(2)} />}
				label={getLang('DialogFuncContent14Text')} />
		</Box>
		<Box mt={1}>
			<FormControlLabel
				control={<Checkbox
					name="prop-4"
					checked={Boolean(Number(prop4))}
					onChange={onCheck(3)} />}
				label={getLang('DialogFuncContent15Text')} />
		</Box>
	</React.Fragment>;
};

ArrSplice = React.memo(ArrSplice);
ArrSplice.defaultProps = {
	id: 0,
};

export default ArrSplice;
