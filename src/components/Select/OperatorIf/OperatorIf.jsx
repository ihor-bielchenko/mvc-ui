import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
import Select from '../Select.jsx';

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
			{getLang('cmpSelectOperatorIfEqual')} (=)
		</MenuItem>,
		<MenuItem 
			key={process.env.OPERATOR_IF_NOT_EQUAL}
			value={process.env.OPERATOR_IF_NOT_EQUAL}>
			{getLang('cmpSelectOperatorIfNoEqual')} (!=)
		</MenuItem>,
	];
	if (isNumeric) {
		items = [
			<MenuItem 
				key={process.env.OPERATOR_IF_MORE}
				value={process.env.OPERATOR_IF_MORE}>
				{getLang('cmpSelectOperatorIfMore')} ({'>'})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_LESS}
				value={process.env.OPERATOR_IF_LESS}>
				{getLang('cmpSelectOperatorIfLess')} ({'<'})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_MORE_EQUAL}
				value={process.env.OPERATOR_IF_MORE_EQUAL}>
				{getLang('cmpSelectOperatorIfMoreOrEq')} ({'>='})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_LESS_EQUAL}
				value={process.env.OPERATOR_IF_LESS_EQUAL}>
				{getLang('cmpSelectOperatorIfLessOrEq')} ({'<='})
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
	label: getLang('cmpSelectOperatorIf'),
	required: false,
	isNumeric: false,
};

export default OperatorIf;
