import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import dataTypes, {
	DATA_TYPE_ATOMIC,
} from 'structures/dataTypes.js';
import Select from '../Select.jsx';

let Type = ({
	disabled, 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	onFilter,
	children, 
}) => {
	return <Select
		disabled={disabled}
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		{Object
			.keys(dataTypes)
			.filter(onFilter)
			.map((key, i) => {
				return <MenuItem 
					key={dataTypes[key].id.toString()}
					value={dataTypes[key].id.toString()}
					disabled={!!dataTypes[key].disabled}>
					{dataTypes[key].text()}
				</MenuItem>
		})}
		{children}
	</Select>;
};

Type = React.memo(Type);
Type.defaultProps = {
	name: 'data_type_id',
	label: 'Тип данных',
	required: false,
	disabled: false,
	onFilter: (key) => dataTypes[key].id !== DATA_TYPE_ATOMIC.id,
};

export default Type;
