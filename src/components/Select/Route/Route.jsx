import React from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { METHOD_TYPE_GET } from 'structures/method.js';
import Select from '../Select.jsx';

let Route = ({ 
	name,
	value,
	defaultValue,
	required,
	label,
	helperText,
	onSelect, 
}) => {
	const routes = useSelector((state) => state.routes.data);
	const form = useSelector((state) => state.routes.form);

	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		helperText={helperText}
		onSelect={onSelect}>
		{routes
			.filter((routeItem) => routeItem.method_id === METHOD_TYPE_GET.id
				&& routeItem.id !== form.id)
			.map((routeItem) => {
			return <MenuItem 
				key={routeItem.id}
				value={routeItem.id}>
				{routeItem.name}
			</MenuItem>
		})}
	</Select>;
};

Route = React.memo(Route);
Route.defaultProps = {
	name: 'route_id',
	label: 'Route',
	required: false,
};

export default Route;
