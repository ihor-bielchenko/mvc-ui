import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import funcServer from 'structures/funcServer.js';
import Select from 'components/Select';

let Server = ({ 
	required,
	name,
	value,
	label,
	helperText, 
	onSelect, 
}) => {
	return <Select
		required={required}
		name={name}
		value={value}
		label={label}
		helperText={helperText}
		onSelect={onSelect}>
		{Object
			.keys(funcServer)
			.map((key, i) => {
				const item = funcServer[key];

				return <MenuItem 
					key={i}
					value={item.id}
					disabled={!!item.disabled}
					data-entity_id={item.entity_id}
					data-format_id={item.format_id}>
					<ListItemAvatar>
						<item.icon color={item.color} />
					</ListItemAvatar>
					<Box my={1}>
						<Typography 
							variant="h6"
							color={item.color}>
							{item.text()}
						</Typography>
						<Typography variant="body2">
							{item.subtext()}
						</Typography>
					</Box>
				</MenuItem>;
			})}
	</Select>;
};

Server = React.memo(Server);
Server.defaultProps = {
	required: false,
	name: 'func_server',
	value: '',
	label: 'Функция',
	helperText: '',
	onSelect: () => {},
};

export default Server;
