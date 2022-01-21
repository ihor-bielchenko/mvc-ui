import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
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
			{getLang('cmpSelectArithPlus')} ({'+'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			{getLang('cmpSelectArithMinus')} ({'-'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			{getLang('cmpSelectArithMultip')} ({'*'})
		</MenuItem>
		<MenuItem 
			key={4}
			value={4}>
			{getLang('cmpSelectArithDivision')} ({'/'})
		</MenuItem>
		<MenuItem 
			key={5}
			value={5}>
			{getLang('cmpSelectArithInStep')} ({'^'})
		</MenuItem>
		<MenuItem 
			key={6}
			value={6}>
			{getLang('cmpSelectArithRoot')} ({'√'})
		</MenuItem>
		<MenuItem 
			disabled
			key={7}
			value={7}>
			{getLang('cmpSelectArithFactor')} ({'!'})
		</MenuItem>
		<MenuItem 
			disabled
			key={8}
			value={8}>
			{getLang('cmpSelectArithProc')} ({'%'})
		</MenuItem>
		<MenuItem 
			disabled
			key={9}
			value={9}>
			{getLang('cmpSelectArithP')} ({'π'})
		</MenuItem>
		<MenuItem 
			disabled
			key={10}
			value={10}>
			{getLang('cmpSelectArithEuler')} ({'e'})
		</MenuItem>
		<MenuItem 
			disabled
			key={11}
			value={11}>
			{getLang('cmpSelectArithMod')}
		</MenuItem>
	</Select>;
};

Arithmetic = React.memo(Arithmetic);
Arithmetic.defaultProps = {
	name: 'arithmetic_id',
	label: getLang('cmpSelectArithAction'),
	required: false,
};

export default Arithmetic;
