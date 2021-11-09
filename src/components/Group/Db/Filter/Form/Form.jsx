import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Store from 'components/Store';
import InputText from 'components/Input/Text';
import SelectColumn from 'components/Select/Column';
import SelectOperatorIf from 'components/Select/OperatorIf';
import onDialog from 'components/Dialog/onDialog.js';
import onValidateSource from 'components/Group/Func/onValidate.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER, 
	DATA_TYPE_TIME,
	DATA_TYPE_TEXT,
	DATA_TYPE_PASSWORD,
} from 'structures/dataTypes.js';
import onColumn from './onColumn.js';
import onOperatorIf from './onOperatorIf.js';
import onChange from './onChange.js';
import onSave from './onSave.js';
import onValueScript from './onValueScript.js';
import onClear from './onClear.js';
import onCancel from './onCancel.js';
import onUnmount from './onUnmount.js';

let Input = ({
	id,
	columnDataTypeId,
	isNumeric,
	onMenu,
	onClear,
	onChange,
}) => {
	const value = React.useMemo(() => ((Store().getState().jsObject.tempValue.filter || {})[id] || {}).value || '', [
		id,
	]);
	const Component = React.lazy(loadColumnInputs(columnDataTypeId));

	return <React.Fragment>
		<React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component
				menu
				onMenu={onMenu}
				onValue={onMenu}
				onDelete={onClear}
				onChange={onChange}
				required={isNumeric}
				defaultValue={value}
				name="value" />
		</React.Suspense>
	</React.Fragment>;
};
Input = React.memo(Input);
Input.defaultProps = {
	id: 0,
	columnDataTypeId: 0,
	isNumeric: false,
};

let Form = ({ 
	id, 
}) => {
	const value = useSelector((state) => ((state.jsObject.tempValue.filter || {})[id] || {}).value || '');
	const operatorId = useSelector((state) => ((state.jsObject.tempValue.filter || {})[id] || {}).operator_if_id || '');
	const columnId = useSelector((state) => ((state.jsObject.tempValue.filter || {})[id] || {}).column_id || '');
	const columnDataTypeId = useSelector((state) => (state.dbColumns.data[columnId] || {}).data_type_id);
	const _onChange = React.useCallback((e) => onChange(e, id), [
		id,
	]);
	const _onColumn = React.useCallback((e) => onColumn(e, id), [
		id,
	]);
	const _onOperatorIf = React.useCallback((e) => onOperatorIf(e, id), [
		id,
	]);
	const _onSave = React.useCallback((e) => onSave(e, id), [
		id,
	]);
	const _onClear = React.useCallback((e) => onClear(e, id), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidateSource(columnDataTypeId === DATA_TYPE_PASSWORD.id
			? ([
				columnDataTypeId,
				DATA_TYPE_TEXT.id,
			])
			: columnDataTypeId),
	})(e), [
		id,
		columnDataTypeId,
	]);

	console.log('columnDataTypeId', columnDataTypeId, columnDataTypeId === DATA_TYPE_PASSWORD.id);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box py={2}>
			<SelectColumn 
				required
				value={columnId}
				onSelect={_onColumn} />
		</Box>
		{columnId > 0 && typeof columnDataTypeId === 'number'
			? (() => {
				const isNumeric = columnDataTypeId === DATA_TYPE_ID.id ||
					columnDataTypeId === DATA_TYPE_NUMBER.id ||
					columnDataTypeId === DATA_TYPE_TIME.id;

				return <React.Fragment>
					<Box py={2}>
						<SelectOperatorIf 
							required
							isNumeric={isNumeric}
							value={operatorId}
							onSelect={_onOperatorIf} />
					</Box>
					<Box py={2}>
						{typeof value === 'object'
							? <InputText
								menu
								onMenu={_onMenu}
								onValue={_onMenu}
								onDelete={_onClear}
								onChange={_onChange}
								required={isNumeric}
								defaultValue={value}
								name="value" />
							: <Input
								id={id}
								columnDataTypeId={columnDataTypeId}
								isNumeric={isNumeric}
								onMenu={_onMenu}
								onClear={_onClear}
								onChange={_onChange} />}
					</Box>
				</React.Fragment>;
			})()
			: <React.Fragment />}
		<Box
			py={2}
			display="flex"
			justifyContent="space-between">
			<Button
				variant="outlined"
				color="secondary"
				startIcon={<CloseIcon />}
				onClick={onCancel}>
				Отменить
			</Button>
			<Button
				type="submit"
				variant="outlined"
				color="primary"
				startIcon={<CheckIcon />}
				onClick={_onSave}>
				Сохранить
			</Button>
		</Box>
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
	id: 0,
};

export default Form;
