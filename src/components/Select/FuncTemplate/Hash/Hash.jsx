import React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { getLang } from 'components/Language';
import funcHash from 'structures/funcHash.js';
import Select from 'components/Select';

let Hash = ({ 
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
			.keys(funcHash)
			.map((key, i) => {
				const item = funcHash[key];

				return <MenuItem 
					key={i}
					value={item.id}
					disabled={!!item.disabled}
					data-entity_id={item.entity_id}
					data-format_id={item.format_id}>
					<Box my={1}>
						<Typography variant="h6">
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

Hash = React.memo(Hash);
Hash.defaultProps = {
	required: false,
	name: 'func_hash',
	value: '',
	label: getLang('cmpSelectFuncTempHashFun'),
	helperText: '',
	onSelect: () => {},
};

export default Hash;
