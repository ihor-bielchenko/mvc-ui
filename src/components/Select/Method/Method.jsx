import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import method from 'structures/method.js';
import Select from '../Select.jsx';

let Method = ({
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
			.keys(method)
			.map((key, i) => {
				return <MenuItem 
					key={method[key].id.toString()}
					value={method[key].id.toString()}
					disabled={!!method[key].disabled}>
					{method[key].text()} ({method[key].name})
				</MenuItem>
		})}
		{children}
	</Select>;
};

Method = React.memo(Method);
Method.defaultProps = {
	name: 'method_id',
	label: 'Method',
	required: false,
	disabled: false,
};

export default Method;
