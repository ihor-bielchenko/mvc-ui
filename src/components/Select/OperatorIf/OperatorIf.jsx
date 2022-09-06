import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';
import { getLang } from 'components/Language';

let OperatorIf = ({ 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	isNumeric,
	children,
}) => {
	let items = [
		<MenuItem 
			key={process.env.OPERATOR_IF_EQUAL}
			value={process.env.OPERATOR_IF_EQUAL}>
			{getLang('OperatorIf3')} (=)
		</MenuItem>,
		<MenuItem 
			key={process.env.OPERATOR_IF_NOT_EQUAL}
			value={process.env.OPERATOR_IF_NOT_EQUAL}>
			{getLang('OperatorIf4')} (!=)
		</MenuItem>,
	];
	if (isNumeric) {
		items = [
			<MenuItem 
				key={process.env.OPERATOR_IF_MORE}
				value={process.env.OPERATOR_IF_MORE}>
				{getLang('OperatorIf1')} ({'>'})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_LESS}
				value={process.env.OPERATOR_IF_LESS}>
				{getLang('OperatorIf2')} ({'<'})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_MORE_EQUAL}
				value={process.env.OPERATOR_IF_MORE_EQUAL}>
				{getLang('OperatorIf5')} ({'>='})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_LESS_EQUAL}
				value={process.env.OPERATOR_IF_LESS_EQUAL}>
				{getLang('OperatorIf6')} ({'<='})
			</MenuItem>,
			...items,
		];
	}

	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		{items}
		{children}
	</Select>;
};

OperatorIf = React.memo(OperatorIf);
OperatorIf.defaultProps = {
	name: 'operator_if_id',
	label: 'Comparison operator',
	required: false,
	isNumeric: false,
};

export default OperatorIf;
