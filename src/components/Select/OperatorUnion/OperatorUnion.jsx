import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
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
			{getLang('cmpSelectOperatorUnionI')} (&&)
		</MenuItem>
		<MenuItem 
			key={process.env.OPERATOR_UNION_OR}
			value={process.env.OPERATOR_UNION_OR}>
			{getLang('cmpSelectOperatorUnionOr')} (||)
		</MenuItem>
		{children}
	</Select>;
};

OperatorUnion = React.memo(OperatorUnion);
OperatorUnion.defaultProps = {
	name: 'operator_union',
	label: getLang('cmpSelectOperatorUnion'),
	required: false,
};

export default OperatorUnion;
