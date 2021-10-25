import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputText from 'components/Input/Text';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_NUMBER,
	DATA_TYPE_TEXT,
} from 'structures/dataTypes.js';
import onDialog from 'components/Dialog/onDialog.js';
import onValidate from 'components/Dialog/SourceProxy/onValidate.js';
import onPlaceholder from './onPlaceholder.js';
import onChangeByLogic from './onChangeByLogic.js';
import onClear from './onClear.js';

let Placeholder = ({ 
	index,
	length,
	routeId, 
	pathTypeId,
	name,
	label,
}) => {
	const value = useSelector((state) => ((state.jsObject.tempValue.placeholder || {})[name] || {}).value || '');
	const _onClear = React.useCallback((e) => onClear(e, name), [
		name,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickEntity: (e, dataTypeId, id) => onChangeByLogic(e, dataTypeId, id, routeId, name),
		formatValidating: () => ([
			DATA_TYPE_NUMBER.id,
			DATA_TYPE_TEXT.id,
		]),
	})(e), [
		routeId,
		name,
	]);
	const _onPlaceholder = React.useCallback((e) => onPlaceholder(e, routeId, name), [
		routeId,
		name,
	]);

	return <React.Fragment>
		<Grid
			item
			xs="auto">
			{pathTypeId === 2
				? <Box maxWidth="160px">
					<InputText
						required
						menu
						onMenu={_onMenu}
						onValue={_onMenu}
						onDelete={_onClear}
						name={name.toString()}
						label={label}
						placeholder="значение"
						onChange={_onPlaceholder}
						onInput={onValidate}
						defaultValue={value} />
				</Box>
				: <Typography>
					{label}
				</Typography>}
		</Grid>
		{index < length - 1
			? <Grid
				item
				xs="auto">
				<Typography>
					/
				</Typography>
			</Grid>
			: <React.Fragment />}
	</React.Fragment>;
};

Placeholder = React.memo(Placeholder);
Placeholder.defaultProps = {
	index: 0,
	length: 0,
	routeId: 0,
	pathTypeId: 0,
	name: 0,
	label: '',
};

export default Placeholder;
