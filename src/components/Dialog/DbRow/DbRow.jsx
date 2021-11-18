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
import Title from 'components/Title';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import dataTypes, {
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';
import { DIALOG_DB_ROW } from 'consts/dialog.js';
import onClose from '../onClose.js';
import onUnmount from './onUnmount.js';
import onSave from './onSave.js';
import onChange from './onChange.js';

let Column = ({ columnKey }) => {
	const dataTypeId = useSelector((state) => state.db.columns[columnKey].data_type_id);
	const name = useSelector((state) => state.db.columns[columnKey].name);
	const description = useSelector((state) => state.db.columns[columnKey].description);
	const value = useSelector((state) => state.db.tempValue[columnKey] ?? '');
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
					value={value}
					onChange={_onChange}
					label={name +' ('+ dataTypes[dataTypeId === DATA_TYPE_ID.id
						? DATA_TYPE_NUMBER.id
						: dataTypeId].text() +')'}
					helperText={description} />
			</React.Suspense>
		</Box>
	</React.Fragment>;
};
Column = React.memo(Column);
Column.defaultProps = {
	columnKey: 0,
};

const _onClose = (e) => {
	onUnmount();
	onClose(DIALOG_DB_ROW)(e);
};
let DbRow = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_ROW]);
	const _dialogOpenFlag = !!dialog;
	const tableId = Number((dialog || {}).tableId || 0);
	const rowId = Number((dialog || {}).rowId || 0);
	const data = useSelector((state) => state.db.tempValue);
	const dataKeys = Object.keys(data);
	const _onSave = React.useCallback((e) => onSave(e, tableId, rowId), [
		tableId,
		rowId,
	]);

	return _dialogOpenFlag
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="sm"
			open={!!dialog}
			onClose={_onClose}>
			<DialogTitle>
				<Title onClose={_onClose}>
					{rowId > 0
						? 'Редактировать запись'
						: 'Новая запись'}
				</Title>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<React.Fragment>
							{dataKeys.map((columnKey) => {
								return parseInt(columnKey) > 0
									? <React.Fragment key={columnKey}>
										<Column columnKey={columnKey} />
									</React.Fragment>
									: <React.Fragment key={columnKey} />;
							})}
						</React.Fragment>
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
								onClick={_onClose}>
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
