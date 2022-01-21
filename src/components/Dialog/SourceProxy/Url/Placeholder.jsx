import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { getLang } from 'components/Language';
import InputText from 'components/Input/Text';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { ROUTE_URL_TYPE_PLACEHOLDER } from 'structures/routeUrl.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import onDialog from 'components/Dialog/onDialog.js';
import onValidateInput from 'components/Input/Validate/constStrTranslit.js';
import onValidateSource from 'components/Dialog/Func/Props/onValidate.js';
import onPlaceholder from './onPlaceholder.js';
import onValueScript from './onValueScript.js';
import onClear from './onClear.js';

let Placeholder = ({ 
	index,
	length,
	routeId, 
	urlTypeId,
	id,
	label,
}) => {
	const value = useSelector((state) => ((state.jsObject.tempValue.placeholder || {})[id] || {}).value || '');
	const _onClear = React.useCallback((e) => onClear(e, id), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(routeId, id),
		dataTypeValidating: onValidateSource(DATA_TYPE_TEXT.id),
	})(e), [
		routeId,
		id,
	]);
	// TODO: rename route_url_id and route_placeholder_id
	const _onPlaceholder = React.useCallback((e) => onPlaceholder(e, routeId, id), [
		routeId,
		id,
	]);

	return <React.Fragment>
		<Grid
			item
			xs="auto">
			{urlTypeId === ROUTE_URL_TYPE_PLACEHOLDER.id
				? <Box maxWidth="160px">
					<InputText
						required
						menu
						onMenu={_onMenu}
						onValue={_onMenu}
						onDelete={_onClear}
						name={id.toString()}
						label={label}
						placeholder={getLang('cmpDialogSourceProxyUrlPlaceholderVal')}
						onChange={_onPlaceholder}
						onInput={onValidateInput}
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
	urlTypeId: 0,
	id: 0,
	label: '',
};

export default Placeholder;
