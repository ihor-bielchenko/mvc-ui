import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import onDialog from 'components/Dialog/onDialog.js';
import sourceTypes from 'structures/sourceTypes.js';
import { SOURCE_TYPE_MANUALLY } from 'structures/sourceTypes.js';
import onClose from '../onClose.js';

let Source = ({
	aria,  
	children, 
	onFilter,
}) => {
	const anchorEl = useSelector((state) => state.menu[aria]
		? state.menu[aria].anchorEl
		: null);
	const name = useSelector((state) => state.menu[aria]
		? state.menu[aria].name
		: null);
	const isCollection = useSelector((state) => state.menu[aria]
		? state.menu[aria].isCollection
		: undefined);

	return <React.Fragment>
		<Menu
			keepMounted
			id={aria}
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={onClose}>
			{children}
			{Object
				.keys(sourceTypes)
				.filter(onFilter)
				.map((key, i) => {
					const item = sourceTypes[key];

					return <MenuItem 
						key={item.id}
						disabled={!!item.disabled}
						onClick={onDialog(item.id, { 
							name, 
							isCollection,
						})}>
						<ListItemAvatar>
							<item.icon />
						</ListItemAvatar>
						<Box my={1}>
							<Typography variant="h6">
								{item.text()}
							</Typography>
						</Box>
					</MenuItem>
				})}
		</Menu>
	</React.Fragment>;
};

Source = React.memo(Source);
Source.defaultProps = {
	aria: 'aria-source',
	onFilter: (key) => sourceTypes[key].id !== SOURCE_TYPE_MANUALLY.id,
};

export default Source;
