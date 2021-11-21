import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import MenuUrl from 'components/Menu/Url';
import onMenu from 'components/Menu/onMenu.js';
import { ROUTE_URL_TYPE_VALUE } from 'structures/routeUrl.js';
import onPath from './onPath.js';
// import onDialog from 'components/Dialog/onDialog.js';
// import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

let Item = ({ 
	index,
	isLast, 
}) => {
	const id = useSelector((state) => state.routes.form.url[index].id);
	const value = useSelector((state) => state.routes.form.url[index].value);
	const routeUrlTypeId = useSelector((state) => state.routes.form.url[index].route_url_type_id || '');

	return <React.Fragment>
		{(routeUrlTypeId === ROUTE_URL_TYPE_VALUE.id)
			? <Box 
				width="max-content"
				minWidth="112px"
				height="40px"
				position="relative">
				<TextField
					required 
					variant="outlined"
					type="text"
					size="small"
					label="Параметр"
					placeholder="Параметр"
					name={String(id)}
					className="placeholder_input"
					value={value || ''}
					onChange={onPath(index)}
					style={{
						position: 'absolute',
					}} />
				<Typography
					style={{
						fontSize: '1rem',
						fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
						fontWeight: 400,
						lineHeight: '1.1876em',
						letterSpacing: '0.00938em',
						padding: '0 14px',
						height: 0,
						overflow: 'hidden',
						maxWidth: 220,
					}}>
					{value || ''}
				</Typography>
			</Box>
		: <Chip 
			color="secondary"
			label={value.toUpperCase()}
			{ ...isLast
				? {
					style: {
						marginRight: 16,
					}
				}
				: {} } />}
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
	const url = useSelector((state) => state.routes.form.url || []);

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
		<React.Fragment>
			<Button 
				onClick={onMenu('menu-url')}
				startIcon={<AddIcon />}
				variant="outlined">
				Маршрут*
			</Button>
			<MenuUrl aria="menu-url" />
		</React.Fragment>
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
