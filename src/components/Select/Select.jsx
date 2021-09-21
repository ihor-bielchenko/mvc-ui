import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SelectMaterial from '@material-ui/core/Select';

let Select = ({ 
	name,
	value,
	defaultValue,
	label,
	helperText, 
	variant,
	size,
	disabled,
	required,
	onSelect, 
	children,
}) => {
	return <FormControl 
		fullWidth 
		disabled={disabled}
		required={required}
		variant={variant}
		size={size}>
		<InputLabel id={`select-label-${name}`}>
			{label}
		</InputLabel>
		<SelectMaterial 
			labelId={`select-label-${name}`}
			id={`select-${name}`}
			label={label}
			name={name}
			{ ...typeof onSelect === 'function'
				? { onChange: onSelect }
				: {} }
			{ ...typeof value === 'undefined'
				? { defaultValue }
				: { value } }>
			{children}
		</SelectMaterial>
		{helperText
			? <FormHelperText>
				{helperText}
			</FormHelperText>
			: <React.Fragment />}
	</FormControl>;
};

Select = React.memo(Select);
Select.defaultProps = {
	name: 'select_default',
	defaultValue: '',
	helperText: '',
	variant: 'outlined',
	size: 'medium',
	disabled: false,
	required: false,
};

export default Select;
