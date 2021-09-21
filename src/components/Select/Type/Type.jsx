import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import columnTypes, {
	COLUMN_RICHTEXT,
	COLUMN_ID,
} from 'structures/columnTypes.js';
import Select from '../Select.jsx';

let Type = ({ 
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
			.keys(columnTypes)
			.filter((key, i) => columnTypes[key].id !== COLUMN_RICHTEXT.id
				&& !(offId && columnTypes[key].id === COLUMN_ID.id))
			.map((key, i) => (
				<MenuItem 
					key={columnTypes[key].id.toString()}
					value={columnTypes[key].id.toString()}
					disabled={!!columnTypes[key].disabled}>
					{columnTypes[key].text()}
				</MenuItem>
		))}
		{children}
	</Select>;
};

Type = React.memo(Type);
Type.defaultProps = {
	name: 'type_id',
	label: 'Тип данных',
	required: false,
	offId: false,
};

export default Type;
