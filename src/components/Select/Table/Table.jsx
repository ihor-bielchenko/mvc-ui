import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
import Select from '../Select.jsx';

let Table = ({ 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	disabled,
	children,
}) => {
	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		disabled={disabled}
		label={label}
		onSelect={onSelect}>
		<MenuItem 
			key={1}
			value={1}>
			<b>main</b>
		</MenuItem>
	</Select>;
};

Table = React.memo(Table);
Table.defaultProps = {
	name: 'table_id',
	label: getLang('cmpSelectTable'),
	required: false,
	disabled: false,
};

export default Table;
