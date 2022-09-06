import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';
import { getLang } from 'components/Language';

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
			{getLang('OperatorJoin1')} (&&)
		</MenuItem>
		<MenuItem 
			key={process.env.OPERATOR_UNION_OR}
			value={process.env.OPERATOR_UNION_OR}>
			{getLang('OperatorJoin2')} (||)
		</MenuItem>
		{children}
	</Select>;
};

OperatorUnion = React.memo(OperatorUnion);
OperatorUnion.defaultProps = {
	name: 'operator_union',
	label: 'Join operator',
	required: false,
};

export default OperatorUnion;
