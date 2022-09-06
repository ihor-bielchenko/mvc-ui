import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import funcTypes from 'structures/funcTypes.js';
import Select from '../Select.jsx';

let FuncType = ({ 
	name,
	value,
	label,
	helperText, 
	required,
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
			.keys(funcTypes)
			.map((key, i) => {
				const item = funcTypes[key];

				return <MenuItem 
					key={item.id}
					value={item.id}
					disabled={!!item.disabled}>
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

FuncType = React.memo(FuncType);
FuncType.defaultProps = {
	name: 'type_id',
	label: 'Function type',
	helperText: 'Select a category to quickly find the function you need',
	value: '',
	required: false,
	onSelect: () => {},
};

export default FuncType;
