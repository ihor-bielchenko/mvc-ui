import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import format from 'structures/format.js';
import Select from '../Select.jsx';

let Format = ({ 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	offId,
	children, 
}) => {
	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		{Object
			.keys(format)
			.map((key, i) => {
				return <MenuItem 
					key={format[key].id.toString()}
					value={format[key].id.toString()}
					disabled={!!format[key].disabled}>
					{format[key].text()}
				</MenuItem>;
		})}
		{children}
	</Select>;
};

Format = React.memo(Format);
Format.defaultProps = {
	name: 'format_id',
	label: 'Формат',
	required: false,
	offId: false,
};

export default Format;
