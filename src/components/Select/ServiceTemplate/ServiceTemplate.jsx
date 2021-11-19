import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {
	SERVICE_TEMPLATE_BASE,
	SERVICE_TEMPLATE_COMMERCE,
	SERVICE_TEMPLATE_MESSAGE,
	SERVICE_TEMPLATE_DISK,
} from 'structures/serviceTemplates.js';
import Select from '../Select.jsx';

let ServiceTemplate = ({
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
			<MenuItem value={SERVICE_TEMPLATE_BASE.id}>
				{SERVICE_TEMPLATE_BASE.text()}
			</MenuItem>
			<MenuItem value={SERVICE_TEMPLATE_COMMERCE.id}>
				{SERVICE_TEMPLATE_COMMERCE.text()}
			</MenuItem>
			<MenuItem value={SERVICE_TEMPLATE_MESSAGE.id}>
				{SERVICE_TEMPLATE_MESSAGE.text()}
			</MenuItem>
			<MenuItem value={SERVICE_TEMPLATE_DISK.id}>
				{SERVICE_TEMPLATE_DISK.text()}
			</MenuItem>
			{children}
	</Select>;
};

ServiceTemplate = React.memo(ServiceTemplate);
ServiceTemplate.defaultProps = {
	name: 'template_id',
	label: 'Шааблон сервиса',
	required: false,
	disabled: false,
};

export default ServiceTemplate;
