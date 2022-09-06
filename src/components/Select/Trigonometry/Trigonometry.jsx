import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';
import { getLang } from 'components/Language';

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
			{getLang('SinusLabel')} ({'sin'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			{getLang('HyperbolicSineLabel')} ({'sinh'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			{getLang('CosineLabel')} ({'cos'})
		</MenuItem>
		<MenuItem 
			key={4}
			value={4}>
			{getLang('TangentLabel')} ({'tan'})
		</MenuItem>
		<MenuItem 
			key={5}
			value={5}>
			{getLang('HyperbolicTangentLabel')} ({'tanh'})
		</MenuItem>
		<MenuItem 
			key={6}
			value={6}>
			{getLang('HyperbolicCosineLabel')} ({'cosh'})
		</MenuItem>
		<MenuItem 
			key={7}
			value={7}>
			{getLang('ArcsineLabel')} ({'asin'})
		</MenuItem>
		<MenuItem 
			key={8}
			value={8}>
			{getLang('HyperbolicArcsineLabel')} ({'asinh'})
		</MenuItem>
		<MenuItem 
			key={9}
			value={9}>
			{getLang('ArcCosineLabel')} ({'acos'})
		</MenuItem>
		<MenuItem 
			key={10}
			value={10}>
			{getLang('HyperbolicArcCosineLabel')} ({'acosh'})
		</MenuItem>
		<MenuItem 
			disabled
			key={11}
			value={11}>
			{getLang('ArcTangentTwoVariablesLabel')} ({'atan2'})
		</MenuItem>
		<MenuItem 
			key={12}
			value={12}>
			{getLang('HyperbolicArcTangentLabel')} ({'atanh'})
		</MenuItem>
		<MenuItem 
			key={13}
			value={13}>
			{getLang('ConvertToRadiansLabel')} ({'deg2rad'})
		</MenuItem>
		<MenuItem 
			key={14}
			value={14}>
			{getLang('ConvertToDegreesLabel')} ({'rad2deg'})
		</MenuItem>
		<MenuItem 
			disabled
			key={15}
			value={15}>
			{getLang('CalculateRightTriangleLabel')} ({'hypot'})
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
