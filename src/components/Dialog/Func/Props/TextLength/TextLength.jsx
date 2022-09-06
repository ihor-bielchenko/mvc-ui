import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
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
import { getLang } from 'components/Language';

let TextLength = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const _onChange1 = React.useCallback((e) => onChange(e, id, 0), [
		id,
	]);
	const _onClear1 = React.useCallback((e) => onClear(e, 0), [
	]);
	const _onMenu1 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(0),
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
		<Box my={2}>
			<InputText
				menu
				onMenu={_onMenu1}
				onValue={_onMenu1}
				onDelete={_onClear1}
				onChange={_onChange1}
				defaultValue={prop1}
				name="prop-1"
				label={getLang('Value')}
				placeholder={getLang('Text')}
				helperText={getLang('SelectCreatedPar')} />
		</Box>
	</React.Fragment>;
};

TextLength = React.memo(TextLength);
TextLength.defaultProps = {
	id: 0,
};

export default TextLength;
