import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputNumeric from 'components/Input/Numeric';
import SelectTrigonometry from 'components/Select/Trigonometry';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DATA_TYPE_NUMBER } from 'structures/dataTypes.js';
import onSelect from '../IfType/onSelect.js';
import onMount from './onMount.js';
import onClear from '../onClear.js';
import onChange from '../onChange.js';
import onValueScript from '../onValueScript.js';
import onValidate from '../onValidate.js';
import onUnmount from '../onUnmount.js';
import { getLang } from 'components/Language';

let MathTrigonometry = ({ 
	id, 
}) => {
	const renderFlag = useSelector((state) => state.jsObject.renderFlag);
	const prop1 = useSelector((state) => ((state.jsObject.blocks[0] || [])[0] || {}).value ?? '');
	const prop2 = useSelector((state) => ((state.jsObject.blocks[0] || [])[1] || {}).value ?? 0);
	const _onSelect1 = React.useCallback((e) => onSelect(e, 0), [
	]);
	const _onChange2 = React.useCallback((e) => onChange(e, id, 1), [
		id,
	]);
	const _onClear2 = React.useCallback((e) => onClear(e, 1), [
	]);
	const _onMenu2 = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(1),
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
		<Box my={2} />
		<Grid
			container
			spacing={3}>
			<Grid
				item
				xs={6}>
				<SelectTrigonometry
					name="prop-1"
					value={prop1}
					onSelect={_onSelect1} />
			</Grid>
			<Grid
				item
				xs={6}>
				<InputNumeric
					menu
					onMenu={_onMenu2}
					onValue={_onMenu2}
					onDelete={_onClear2}
					onChange={_onChange2}
					defaultValue={prop2}
					name="prop-2"
					label={getLang('Value')}
					placeholder={getLang('Num')}
					helperText={getLang('SelectCreatedPar')} />
			</Grid>
		</Grid>
	</React.Fragment>;
};

MathTrigonometry = React.memo(MathTrigonometry);
MathTrigonometry.defaultProps = {
	id: 0,
};

export default MathTrigonometry;
