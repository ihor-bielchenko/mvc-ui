import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';
import { getLang } from 'components/Language';

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
			{getLang('PlusLabel')} ({'+'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			{getLang('MinusLabel')} ({'-'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			{getLang('MultiplicationLabel')} ({'*'})
		</MenuItem>
		<MenuItem 
			key={4}
			value={4}>
			{getLang('DivisionLabel')} ({'/'})
		</MenuItem>
		<MenuItem 
			key={5}
			value={5}>
			{getLang('ToDegreeLabel')} ({'^'})
		</MenuItem>
		<MenuItem 
			key={6}
			value={6}>
			{getLang('RootLabel')} ({'√'})
		</MenuItem>
		<MenuItem 
			disabled
			key={7}
			value={7}>
			{getLang('FactorialLabel')} ({'!'})
		</MenuItem>
		<MenuItem 
			disabled
			key={8}
			value={8}>
			{getLang('InterestLabel')} ({'%'})
		</MenuItem>
		<MenuItem 
			disabled
			key={9}
			value={9}>
			{getLang('NumberP888')} ({'π'})
		</MenuItem>
		<MenuItem 
			disabled
			key={10}
			value={10}>
			{getLang('NumberE888')} ({'e'})
		</MenuItem>
		<MenuItem 
			disabled
			key={11}
			value={11}>
			{getLang('ModuleLabel888')}
		</MenuItem>
	</Select>;
};

Arithmetic = React.memo(Arithmetic);
Arithmetic.defaultProps = {
	name: 'arithmetic_id',
	label: 'Action',
	required: false,
};

export default Arithmetic;
