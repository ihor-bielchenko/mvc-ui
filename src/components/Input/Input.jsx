import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import LogicValue from './LogicValue.jsx';

let Input = ({
	id,
	className,
	type,
	name,
	menu,
	size,
	disabled,
	required,
	error,
	label,
	helperText,
	placeholder,
	chipText,
	defaultValue,
	value,
	inputComponent,
	onInput,
	onChange,
	onMenu,
	onValue,
	onDelete,
}) => {
	const _onMenu = React.useCallback((e) => onMenu(e, name), [
		onMenu,
		name,
	]);
	const _onValue = React.useCallback((e) => onValue(e, name), [
		onValue,
		name,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, name), [
		onDelete,
		name,
	]);

	return <Box position="relative">
		<TextField
			fullWidth
			variant="outlined"
			disabled={disabled}
			required={required}
			error={error}
			size={size}
			label={label}
			helperText={helperText}
			type={type}
			onInput={onInput}
			onChange={onChange}
			{ ...id
				? { id }
				: {} }
			{ ...className
				? { className }
				: {} }
			{ ...name
				? { name }
				: {} }
			{ ...(typeof value === 'object' || typeof defaultValue === 'object')
				? { disabled: true }
				: { 
					placeholder,
					...(typeof value === 'string' || typeof value === 'number')
						? { value }
						: (typeof defaultValue === 'string' || typeof defaultValue === 'number')
							? { defaultValue }
							: {} 
				} }
			InputProps={{
				...inputComponent
					? { inputComponent }
					: {},
				...(menu && name)
					? {
						startAdornment: <InputAdornment 
							aria-controls={name}
							onClick={_onMenu}
							position="start">
							<IconButton size="small">
								<AddIcon fontSize="small" />
							</IconButton>
						</InputAdornment>,
					}
					: {},
				}} />
		{(typeof value === 'object' && value.source_id > 0)
			? <LogicValue
				chipText={chipText}
				sourceId={value.source_id}
				entityId={value.entity_id} />
			: (defaultValue && typeof defaultValue === 'object' && defaultValue.source_id > 0)
				? <LogicValue
					chipText={chipText}
					sourceId={defaultValue.source_id}
					entityId={defaultValue.entity_id}
					onDelete={_onDelete}
					onClick={_onValue} />
				: <React.Fragment />}
	</Box>;
};

Input = React.memo(Input);
Input.defaultProps = {
	type: 'text',
	menu: false,
	disabled: false,
	required: false,
	error: false,
	size: 'medium',
	label: 'Поле для ввода',
	helperText: '',
	placeholder: 'Ничего не написано',
	onInput: () => {},
	onChange: () => {},
	onMenu: () => {},
	onValue: () => {},
	onDelete: () => {},
};

export default Input;
