import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
import Select from '../Select.jsx';

let MathLog = ({ 
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
			{getLang('cmpSelectMathLogNat')} ({'log'})
		</MenuItem>
		<MenuItem 
			key={2}
			value={2}>
			{getLang('cmpSelectMathLogTen')} ({'log10'})
		</MenuItem>
		<MenuItem 
			key={3}
			value={3}>
			{getLang('cmpSelectMathLogReturn')} log(1 + number)
		</MenuItem>
	</Select>;
};

MathLog = React.memo(MathLog);
MathLog.defaultProps = {
	name: 'math_log_id',
	label: getLang('cmpSelectMathLog'),
	required: false,
};

export default MathLog;
