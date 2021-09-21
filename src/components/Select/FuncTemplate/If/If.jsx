import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import funcIf from 'structures/funcIf.js';
import Select from 'components/Select';

let If = ({ 
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
			.keys(funcIf)
			.map((key, i) => {
				const item = funcIf[key];

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

If = React.memo(If);
If.defaultProps = {
	required: false,
	name: 'func_if',
	value: '',
	label: 'Функция',
	helperText: '',
	onSelect: () => {},
};

export default If;
