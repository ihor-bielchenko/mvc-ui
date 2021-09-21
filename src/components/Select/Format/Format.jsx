import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import format from 'structures/format.js';
import Select from '../Select.jsx';

const onMap = (key) => (
	<MenuItem 
		key={format[key].id.toString()}
		value={format[key].id.toString()}
		disabled={!!format[key].disabled}>
		{format[key].text()}
	</MenuItem>
);
let Format = ({ 
	name,
	value,
	label,
	defaultValue,
	onSelect,
	required,
	onFilter,
	children, 
}) => {
	const _formatKeys = React.useMemo(() => Object.keys(format), []);

	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		onSelect={onSelect}>
		{typeof onFilter === 'function'
			? _formatKeys
				.filter(onFilter)
				.map(onMap)
			: _formatKeys.map(onMap)}
		{children}
	</Select>;
};

Format = React.memo(Format);
Format.defaultProps = {
	name: 'format_id',
	label: 'Формат',
	required: false,
};

export default Format;
