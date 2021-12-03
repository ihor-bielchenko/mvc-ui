import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';

let Trigonometry = ({ 
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
			Синус ({'sin'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			Гиперболический синус ({'sinh'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			Косинус ({'cos'})
		</MenuItem>
		<MenuItem 
			key={4}
			value={4}>
			Тангенс ({'tan'})
		</MenuItem>
		<MenuItem 
			key={5}
			value={5}>
			Гиперболический тангенс ({'tanh'})
		</MenuItem>
		<MenuItem 
			key={6}
			value={6}>
			Гиперболический косинус ({'cosh'})
		</MenuItem>
		<MenuItem 
			key={7}
			value={7}>
			Арксинус ({'asin'})
		</MenuItem>
		<MenuItem 
			key={8}
			value={8}>
			Гиперболический арксинус ({'asinh'})
		</MenuItem>
		<MenuItem 
			key={9}
			value={9}>
			Арккосинус ({'acos'})
		</MenuItem>
		<MenuItem 
			key={10}
			value={10}>
			Гиперболический арккосинус ({'acosh'})
		</MenuItem>
		<MenuItem 
			disabled
			key={11}
			value={11}>
			Арктангенс двух переменных ({'atan2'})
		</MenuItem>
		<MenuItem 
			key={12}
			value={12}>
			Гиперболический арктангенс ({'atanh'})
		</MenuItem>
		<MenuItem 
			key={13}
			value={13}>
			Преобразует значение из градусов в радианы ({'deg2rad'})
		</MenuItem>
		<MenuItem 
			key={14}
			value={14}>
			Преобразует значение из радианов в градусы ({'rad2deg'})
		</MenuItem>
		<MenuItem 
			disabled
			key={15}
			value={15}>
			Рассчитывает длину гипотенузы прямоугольного треугольника ({'hypot'})
		</MenuItem>
	</Select>;
};

Trigonometry = React.memo(Trigonometry);
Trigonometry.defaultProps = {
	name: 'trigonometry_id',
	label: 'Тригонометрическое действие',
	required: false,
};

export default Trigonometry;
