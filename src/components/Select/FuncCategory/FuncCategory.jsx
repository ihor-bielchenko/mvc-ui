import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import funcCategories, {
	FUNC_CATEGORY_IF,
} from 'structures/funcCategories.js';
import Select from '../Select.jsx';

let FuncCategory = ({ 
	name,
	value,
	label,
	helperText, 
	required,
	onSelect, 
	onFilter,
}) => {
	return <Select 
		required={required}
		name={name}
		value={value}
		label={label}
		helperText={helperText}
		onSelect={onSelect}>
		{Object
			.keys(funcCategories)
			.filter(onFilter)
			.map((key, i) => {
				const item = funcCategories[key];

				return <MenuItem 
					key={item.id}
					value={item.id}
					disabled={!!item.disabled}>
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

FuncCategory = React.memo(FuncCategory);
FuncCategory.defaultProps = {
	name: 'func_category_id',
	label: 'Feature category',
	helperText: '',
	value: '',
	required: false,
	onSelect: () => {},
	onFilter: (key) => Number(key) !== FUNC_CATEGORY_IF.id,
};

export default FuncCategory;
