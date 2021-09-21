import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import columnTypes, {
	COLUMN_RICHTEXT,
} from 'structures/columnTypes.js';
import Select from '../Select.jsx';

let Type = ({ 
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
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		{children}
		{Object
			.keys(columnTypes)
			.filter(onFilter)
			.map((key, i) => (
				<MenuItem 
					key={columnTypes[key].id.toString()}
					value={columnTypes[key].id.toString()}
					disabled={!!columnTypes[key].disabled}>
					{columnTypes[key].text()}
				</MenuItem>
		))}
	</Select>;
};

Type = React.memo(Type);
Type.defaultProps = {
	name: 'type_id',
	label: 'Тип данных',
	required: false,
	onFilter: () => (key, i) => columnTypes[key].id !== COLUMN_RICHTEXT.id,
};

export default Type;
