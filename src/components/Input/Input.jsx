import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { getLang } from 'components/Language';
import LogicValue from './LogicValue.jsx';

let Input = ({
	id,
	className,
	type,
	name,
	menu,
	size,
	multiline,
	rows,
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
		{(typeof value === 'object' && value.source_type_id > 0)
			? <React.Fragment>
				<LogicValue
					label={label}
					chipText={chipText}
					sourceTypeId={value.source_type_id}
					entityId={value.id}
					onDelete={_onDelete}
					onClick={_onValue} />
			</React.Fragment>
			: (defaultValue && typeof defaultValue === 'object' && defaultValue.source_type_id > 0)
				? <React.Fragment>
					<LogicValue
						label={label}
						chipText={chipText}
						sourceTypeId={defaultValue.source_type_id}
						entityId={defaultValue.id}
						onDelete={_onDelete}
						onClick={_onValue} />
				</React.Fragment>
				: <TextField
					fullWidth
					variant="outlined"
					disabled={disabled}
					required={required}
					multiline={multiline}
					rows={rows}
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
									<IconButton 
										disabled={disabled}
										size="small">
										<AddIcon fontSize="small" />
									</IconButton>
								</InputAdornment>,
							}
							: {},
						}} />}
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
	label: getLang('cmpInputField'),
	helperText: '',
	placeholder: getLang('cmpInputFieldEmpty'),
	onInput: () => {},
	onChange: () => {},
	onMenu: () => {},
	onValue: () => {},
	onDelete: () => {},
};

export default Input;
