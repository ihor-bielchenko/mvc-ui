import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { getLang } from 'components/Language';
import responseCodes from 'structures/responseCodes.js';
import Select from '../Select.jsx';

let ResponseCode = ({
	disabled, 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	onFilter,
	children, 
}) => {
	return <Select
		disabled={disabled}
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		{Object
			.keys(responseCodes)
			.filter(onFilter)
			.map((key, i) => {
				return <MenuItem 
					key={responseCodes[key].value.toString()}
					value={responseCodes[key].value.toString()}
					disabled={!!responseCodes[key].disabled}>
					{responseCodes[key].text()}
				</MenuItem>
		})}
		{children}
	</Select>;
};

ResponseCode = React.memo(ResponseCode);
ResponseCode.defaultProps = {
	name: 'code',
	label: getLang('cmpSelectResponseCode'),
	required: false,
	disabled: false,
	onFilter: (item) => true,
};

export default ResponseCode;
