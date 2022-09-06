import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import funcText from 'structures/funcText.js';
import Select from 'components/Select';

let Text = ({ 
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
			.keys(funcText)
			.map((key, i) => {
				const item = funcText[key];

				return <MenuItem 
					key={i}
					value={item.id}
					disabled={!!item.disabled}
					data-entity_id={item.entity_id}
					data-format_id={item.format_id}>
					<Box my={1}>
						<Typography 
							variant="h6"
							color={item.color ?? 'inherit'}>
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

Text = React.memo(Text);
Text.defaultProps = {
	required: false,
	name: 'func_text',
	value: '',
	label: 'Function',
	helperText: '',
	onSelect: () => {},
};

export default Text;
