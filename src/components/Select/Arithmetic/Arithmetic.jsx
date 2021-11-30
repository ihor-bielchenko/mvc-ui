import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';

let Arithmetic = ({ 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	isNumeric,
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
			key={1}
			value={1}>
			Плюс ({'+'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			Минус ({'-'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			Умножение ({'*'})
		</MenuItem>
		<MenuItem 
			key={4}
			value={4}>
			Деление ({'/'})
		</MenuItem>
		<MenuItem 
			key={5}
			value={5}>
			В степень ({'^'})
		</MenuItem>
		<MenuItem 
			key={6}
			value={6}>
			Корень ({'√'})
		</MenuItem>
		<MenuItem 
			key={7}
			value={7}>
			Факториал ({'!'})
		</MenuItem>
		<MenuItem 
			key={8}
			value={8}>
			Проценты ({'%'})
		</MenuItem>
		<MenuItem 
			key={9}
			value={9}>
			Число π ({'π'})
		</MenuItem>
		<MenuItem 
			key={10}
			value={10}>
			Число Эйлера ({'e'})
		</MenuItem>
		<MenuItem 
			key={11}
			value={11}>
			Модуль числа
		</MenuItem>
	</Select>;
};

Arithmetic = React.memo(Arithmetic);
Arithmetic.defaultProps = {
	name: 'arithmetic_id',
	label: 'Действие',
	required: false,
};

export default Arithmetic;
