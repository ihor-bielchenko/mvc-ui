import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
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
			{getLang('cmpSelectTrigonometrySin')} ({'sin'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			{getLang('cmpSelectTrigonometrySinh')} ({'sinh'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			{getLang('cmpSelectTrigonometryCos')} ({'cos'})
		</MenuItem>
		<MenuItem 
			key={4}
			value={4}>
			{getLang('cmpSelectTrigonometryTan')} ({'tan'})
		</MenuItem>
		<MenuItem 
			key={5}
			value={5}>
			{getLang('cmpSelectTrigonometryTanh')} ({'tanh'})
		</MenuItem>
		<MenuItem 
			key={6}
			value={6}>
			{getLang('cmpSelectTrigonometryCosh')} ({'cosh'})
		</MenuItem>
		<MenuItem 
			key={7}
			value={7}>
			{getLang('cmpSelectTrigonometryAsin')} ({'asin'})
		</MenuItem>
		<MenuItem 
			key={8}
			value={8}>
			{getLang('cmpSelectTrigonometryAsinh')} ({'asinh'})
		</MenuItem>
		<MenuItem 
			key={9}
			value={9}>
			{getLang('cmpSelectTrigonometryAcos')} ({'acos'})
		</MenuItem>
		<MenuItem 
			key={10}
			value={10}>
			{getLang('cmpSelectTrigonometryAcosh')} ({'acosh'})
		</MenuItem>
		<MenuItem 
			disabled
			key={11}
			value={11}>
			{getLang('cmpSelectTrigonometryAtan2')} ({'atan2'})
		</MenuItem>
		<MenuItem 
			key={12}
			value={12}>
			{getLang('cmpSelectTrigonometryAtanh')} ({'atanh'})
		</MenuItem>
		<MenuItem 
			key={13}
			value={13}>
			{getLang('cmpSelectTrigonometryDeg2Rad')} ({'deg2rad'})
		</MenuItem>
		<MenuItem 
			key={14}
			value={14}>
			{getLang('cmpSelectTrigonometryRad2Deg')} ({'rad2deg'})
		</MenuItem>
		<MenuItem 
			disabled
			key={15}
			value={15}>
			{getLang('cmpSelectTrigonometryHypot')} ({'hypot'})
		</MenuItem>
	</Select>;
};

Trigonometry = React.memo(Trigonometry);
Trigonometry.defaultProps = {
	name: 'trigonometry_id',
	label: getLang('cmpSelectTrigonometryActions'),
	required: false,
};

export default Trigonometry;
