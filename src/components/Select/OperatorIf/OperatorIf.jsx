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
			key={3}
			value={3}>
			Равно (=)
		</MenuItem>,
		<MenuItem 
			key={4}
			value={4}>
			Не равно (!=)
		</MenuItem>,
	];
	if (isNumeric) {
		items = [
			<MenuItem 
				key={1}
				value={1}>
				Больше ({'>'})
			</MenuItem>,
			<MenuItem 
				key={2}
				value={2}>
				Меньше ({'<'})
			</MenuItem>,
			<MenuItem 
				key={5}
				value={5}>
				Больше или равно ({'>='})
			</MenuItem>,
			<MenuItem 
				key={6}
				value={6}>
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
	name: 'operator_id',
	label: 'Оператор сравнения',
	required: false,
	isNumeric: false,
};

export default OperatorIf;
