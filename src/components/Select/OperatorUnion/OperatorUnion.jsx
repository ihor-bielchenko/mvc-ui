import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';

let OperatorUnion = ({ 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	children, 
}) => {
	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		<MenuItem 
			key={process.env.OPERATOR_UNION_AND}
			value={process.env.OPERATOR_UNION_AND}>
			И (&&)
		</MenuItem>
		<MenuItem 
			key={process.env.OPERATOR_UNION_OR}
			value={process.env.OPERATOR_UNION_OR}>
			ИЛИ (||)
		</MenuItem>
		{children}
	</Select>;
};

OperatorUnion = React.memo(OperatorUnion);
OperatorUnion.defaultProps = {
	name: 'operator_union',
	label: 'Оператор соединения',
	required: false,
};

export default OperatorUnion;
