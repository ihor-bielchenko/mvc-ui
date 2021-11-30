import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import funcObj from 'structures/funcObj.js';
import Select from 'components/Select';

let Obj = ({ 
	required,
	name,
	value,
	label,
	helperText,
	inArr, 
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
			.keys(funcObj)
			.map((key, i) => {
				const item = funcObj[key];

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

Obj = React.memo(Obj);
Obj.defaultProps = {
	required: false,
	name: 'func_obj',
	value: '',
	label: 'Функция',
	helperText: '',
	inArr: false,
	onSelect: () => {},
};

export default Obj;
