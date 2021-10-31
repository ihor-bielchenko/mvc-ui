import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
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
			Равно (=)
		</MenuItem>,
		<MenuItem 
			key={process.env.OPERATOR_IF_NOT_EQUAL}
			value={process.env.OPERATOR_IF_NOT_EQUAL}>
			Не равно (!=)
		</MenuItem>,
	];
	if (isNumeric) {
		items = [
			<MenuItem 
				key={process.env.OPERATOR_IF_MORE}
				value={process.env.OPERATOR_IF_MORE}>
				Больше ({'>'})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_LESS}
				value={process.env.OPERATOR_IF_LESS}>
				Меньше ({'<'})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_MORE_EQUAL}
				value={process.env.OPERATOR_IF_MORE_EQUAL}>
				Больше или равно ({'>='})
			</MenuItem>,
			<MenuItem 
				key={process.env.OPERATOR_IF_LESS_EQUAL}
				value={process.env.OPERATOR_IF_LESS_EQUAL}>
				Меньше или равно ({'<='})
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
	label: 'Оператор сравнения',
	required: false,
	isNumeric: false,
};

export default OperatorIf;
