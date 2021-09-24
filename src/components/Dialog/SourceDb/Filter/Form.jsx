import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Store from 'components/Store';
import SelectColumn from 'components/Select/Column';
import SelectOperatorIf from 'components/Select/OperatorIf';
import typeFormatValidating from 'utils/typeFormatValidating.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { SOURCE_SCRIPT } from 'structures/source.js';
import { 
	COLUMN_ID,
	COLUMN_NUMBER, 
	COLUMN_TIME,
} from 'structures/columnTypes.js';
import onDialog from '../../onDialog.js';
import onColumn from './onColumn.js';
import onSubmit from './onSubmit.js';
import onCancel from './onCancel.js';
import onChangeByLogic from './onChangeByLogic.js';
import onClear from './onClear.js';

let Form = ({ 
	name,
	setId, 
}) => {
	const value = useSelector((state) => ((state.jsObject.tempValue.filter || {})[name] || {}).value || '');
	const operatorId = useSelector((state) => ((state.jsObject.tempValue.filter || {})[name] || {}).operator_id || '');
	const columnId = useSelector((state) => ((state.jsObject.tempValue.filter || {})[name] || {}).column_id || '');
	const [ tempColumnId, setTempColumnId ] = React.useState(() => columnId || '');
	const [ logicValue, setLogicValue ] = React.useState(() => (typeof value === 'object' && 
		value.source_id === SOURCE_SCRIPT.id)
		? value
		: undefined);
	const _column = Store().getState().dbColumns.data[tempColumnId];
	const _onColumn = React.useCallback((e) => onColumn(e, name, setTempColumnId, setLogicValue), [
		setTempColumnId,
		setLogicValue,
		name,
	]);
	const _onClear = React.useCallback((e) => onClear(e, name, setLogicValue), [
		name,
		setLogicValue,
	]);
	const _onSubmit = React.useCallback((e) => onSubmit(e, logicValue), [
		logicValue,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_SCRIPT.id, {
		onClickEntity: (e, typeId, id) => onChangeByLogic(e, typeId, id, setLogicValue),
		formatValidating: typeFormatValidating((_column || {}).type_id),
	})(e), [
		_column,
		setLogicValue,
	]);

	return <form onSubmit={_onSubmit}>
		<input 
			type="hidden"
			name="id"
			value={name} />
		<Box py={2}>
			<SelectColumn 
				required
				value={tempColumnId}
				onSelect={_onColumn} />
		</Box>
		{tempColumnId > 0 && _column
			? (() => {
				const isNumeric = _column.type_id === COLUMN_ID.id ||
					_column.type_id === COLUMN_NUMBER.id ||
					_column.type_id === COLUMN_TIME.id;
				const Component = React.lazy(loadColumnInputs(_column.type_id));

				return <React.Fragment>
					<Box py={2}>
						<SelectOperatorIf 
							required
							isNumeric={isNumeric}
							{ ...operatorId
								? { defaultValue: operatorId }
								: {} } />
					</Box>
					<Box py={2}>
						<React.Suspense fallback={<Typography>Подождите...</Typography>}>
							<Component
								menu
								onMenu={_onMenu}
								onValue={_onMenu}
								onDelete={_onClear}
								name="value"
								required={isNumeric}
								defaultValue={logicValue || value || ''} />
						</React.Suspense>
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
				startIcon={<CheckIcon />}>
				Сохранить
			</Button>
		</Box>
	</form>;
};

Form = React.memo(Form);
Form.defaultProps = {
	name: 0,
};

export default Form;
