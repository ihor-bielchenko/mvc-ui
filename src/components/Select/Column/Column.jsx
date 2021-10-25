import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Store from 'components/Store';
import Select from '../Select.jsx';

let Column = ({ 
	name,
	value,
	defaultValue,
	required,
	label,
	helperText,
	onSelect, 
}) => {
	const dbColumnsData = Store().getState().dbColumns.data;

	return <Select
		name={name}
		value={value}
		defaultValue={defaultValue}
		required={required}
		label={label}
		helperText={helperText}
		onSelect={onSelect}>
		{Object.keys(dbColumnsData).map((id) => {
			return <MenuItem 
				key={id}
				value={id}>
				<Typography 
					color={dbColumnsData[id].data_type_id === 0
						? 'secondary'
						: 'initial'}>
					<b>{dbColumnsData[id].name}</b>
				</Typography>
			</MenuItem>
		})}
	</Select>;
};

Column = React.memo(Column);
Column.defaultProps = {
	name: 'column_id',
	label: 'Выбрать поле',
	required: false,
};

export default Column;
