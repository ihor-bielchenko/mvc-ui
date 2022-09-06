import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import protocol from 'structures/protocol.js';
import Select from '../Select.jsx';

let Protocol = ({
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
			.keys(protocol)
			.map((key, i) => {
				return <MenuItem 
					key={protocol[key].id.toString()}
					value={protocol[key].id.toString()}
					disabled={!!protocol[key].disabled}>
					{protocol[key].text()}
				</MenuItem>
		})}
		{children}
	</Select>;
};

Protocol = React.memo(Protocol);
Protocol.defaultProps = {
	name: 'protocol_id',
	label: 'Protocol',
	required: false,
	disabled: false,
};

export default Protocol;
