import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Store from 'components/Store';
import Title from 'components/Title';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';
import { DIALOG_DB_ROW } from 'consts/dialog.js';
import onSave from './onSave.js';
import onChange from './onChange.js';
import onClose from './onClose.js';

export let Column = ({ 
	columnKey,
	error, 
}) => {
	const db = Store().getState().db;
	const dataTypeId = db.columns[columnKey].data_type_id;
	const name = db.columns[columnKey].name;
	const description = db.columns[columnKey].description;
	const value = db.tempValue[columnKey] ?? '';
	const _onChange = React.useCallback((e) => onChange(e, columnKey), [
		columnKey,
	]);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);

	return <React.Fragment>
		<Box py={1}>
			<React.Suspense fallback={<Typography>Подождите...</Typography>}>
				<Component
					disabled={dataTypeId === DATA_TYPE_ID.id}
					name={columnKey.toString()}
					onChange={_onChange}
					defaultValue={value}
					label={name +' ('+ dataTypes[dataTypeId === DATA_TYPE_ID.id
						? DATA_TYPE_NUMBER.id
						: dataTypeId].text() +')'}
					helperText={error
						? 'Поле обязательно для заполнения'
						: description}
					error={error} />
			</React.Suspense>
		</Box>
	</React.Fragment>;
};
Column = React.memo(Column);
Column.defaultProps = {
	columnKey: 0,
	error: false,
};

export let DbRowContent = ({ error }) => {
	const columns = useSelector((state) => state.db.columns);
	const columnKeys = Object.keys(columns);
	const _error = error();

	return <React.Fragment>
		{columnKeys.map((columnKey) => {
			return parseInt(columnKey) > 0
				? <React.Fragment key={columnKey}>
					<Column 
						columnKey={columnKey}
						error={_error[columnKey]} />
				</React.Fragment>
				: <React.Fragment key={columnKey} />;
		})}
	</React.Fragment>;
};
DbRowContent = React.memo(DbRowContent);
DbRowContent.defaultProps = {
	error: () => ({}),
};

let DbRow = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_ROW]);
	const _dialogOpenFlag = !!dialog;
	const tableId = Number((dialog || {}).tableId || 0);
	const rowId = Number((dialog || {}).rowId || 0);
	const columns = useSelector((state) => state.db.columns);
	const columnKeys = Object.keys(columns);
	const [ error, setError ] = React.useState(() => {
		const collector = {};

		columnKeys.forEach((columnId) => {
			collector[columnId] = false;
		});
		return collector;
	});
	const _onSave = React.useCallback((e) => onSave(e, tableId, rowId, setError), [
		tableId,
		rowId,
		setError,
	]);

	return _dialogOpenFlag
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="sm"
			open={!!dialog}
			onClose={onClose}>
			<DialogTitle>
				<Title onClose={onClose}>
					{rowId > 0
						? 'Редактировать запись'
						: 'Новая запись'}
				</Title>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<DbRowContent error={() => error} />
					</DialogContent>
					<DialogActions>
						<Box 
							p={2}
							width="100%"
							display="flex"
							justifyContent="space-between">
							<Button 
								variant="outlined"
								color="secondary"
								startIcon={<CloseIcon />}
								onClick={onClose}>
								Отмена
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={_onSave}>
								{rowId > 0
									? 'Сохранить'
									: 'Добавить'}
							</Button>
						</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

DbRow = React.memo(DbRow);
DbRow.defaultProps = {
};

export default DbRow;
