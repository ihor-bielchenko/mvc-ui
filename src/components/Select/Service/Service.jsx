import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '../Select.jsx';

let Service = ({ 
	name,
	value,
	defaultValue,
	required,
	label,
	helperText,
	onSelect, 
}) => {
	const services = useSelector((state) => state.services.data);

	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		helperText={helperText}
		onSelect={onSelect}>
		{services.map((serviceItem) => {
			return <MenuItem 
				key={serviceItem.id}
				value={serviceItem.id}>
				{serviceItem.name}
			</MenuItem>
		})}
	</Select>;
};

Service = React.memo(Service);
Service.defaultProps = {
	name: 'service_id',
	label: 'Service',
	required: false,
};

export default Service;
