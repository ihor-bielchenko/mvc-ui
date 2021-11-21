import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import onDialog from 'components/Dialog/onDialog.js';
import { ROUTE_URL_TYPE_VALUE } from 'structures/routeUrl.js';
import { 
	DIALOG_URL_VALUE,
	DIALOG_URL_PLACEHOLDER, 
	DIALOG_DELETE_CONFIRM,
} from 'consts/dialog.js';
import onDelete from './onDelete.js';

let Item = ({ 
	index,
	isLast, 
}) => {
	const value = useSelector((state) => state.routes.form.url[index].value);
	const routeUrlTypeId = useSelector((state) => state.routes.form.url[index].route_url_type_id || '');
	const _onDelete = React.useCallback((e) => onDelete(e, index), [
		index,
	]);

	return <React.Fragment>
		<Chip 
			color={routeUrlTypeId === ROUTE_URL_TYPE_VALUE.id
				? 'default'
				: 'secondary'}
			label={value}
			onClick={onDialog(routeUrlTypeId === ROUTE_URL_TYPE_VALUE.id
				? DIALOG_URL_VALUE
				: DIALOG_URL_PLACEHOLDER, { index })}
			{ ...isLast
				? {
					style: {
						marginRight: 16,
					}
				}
				: {} }
			onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
				onDelete: _onDelete,
			})}
			style={{
				textTransform: routeUrlTypeId === ROUTE_URL_TYPE_VALUE.id
					? 'lowercase'
					: 'initial',
			}} />
		{isLast
			? <React.Fragment />
			: <Typography
				style={{
					padding: '0 4px',
				}}>
				/
			</Typography>}
	</React.Fragment>;
};
Item = React.memo(Item);
Item.defaultProps = {
	index: 0,
	isLast: false,
};

let Url = () => {
	const url = useSelector((state) => ([ ...state.routes.form.url || [] ]));

	return <Box
		display="flex"
		alignItems="center">
		{url.map((item, index) => {
			const isLast = index === url.length - 1;

			return <Item 
				key={item.id}
				index={index}
				isLast={isLast} />;
		})}
	</Box>;
};

Url = React.memo(Url);
Url.defaultProps = {
	disabledPath: false,
	disabledPlaceholder: false,
	activePlaceholders: false,
	onPath: () => {},
	onPlaceholder: () => {},
	onDelete: () => {},
};

export default Url;
