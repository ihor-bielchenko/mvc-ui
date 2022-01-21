import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';
import TextRotationDownIcon from '@material-ui/icons/TextRotationDown';
import { getLang } from 'components/Language';
import Select from '../Select.jsx';

let Direction = ({ 
	name,
	value,
	defaultValue,
	required,
	label,
	helperText, 
	onSelect, 
	children,
}) => {
	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		helperText={helperText}
		onSelect={onSelect}>
		<MenuItem value={0}>
			<ListItemAvatar>
				<TextRotateUpIcon />
			</ListItemAvatar>
			<Box my={1}>
				{getLang('cmpSelectDirectionUp')}
			</Box>
		</MenuItem>
		<MenuItem value={1}>
			<ListItemAvatar>
				<TextRotationDownIcon />
			</ListItemAvatar>
			<Box my={1}>
				{getLang('cmpSelectDirectionDown')}
			</Box>
		</MenuItem>
		{children}
	</Select>;
};

Direction = React.memo(Direction);
Direction.defaultProps = {
	name: 'direction',
	label: getLang('cmpSelectDirection'),
	required: false,
};

export default Direction;
