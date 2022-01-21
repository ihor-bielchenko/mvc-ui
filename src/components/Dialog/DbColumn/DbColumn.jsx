import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { getLang } from 'components/Language';
import Title from 'components/Title';
import SelectDataType from 'components/Select/DataType';
import InputText from 'components/Input/Text';
import { DIALOG_DB_COLUMN } from 'consts/dialog.js';
import dataTypes, {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_ID,
	DATA_TYPE_NULL,
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';
import onClose from '../onClose.js';
import onSelectDataTypeId from './onSelectDataTypeId.js';
import onUnmount from './onUnmount.js';
import onSave from './onSave.js';
import onChange from './onChange.js';
import onCheckRequired from './onCheckRequired.js';

let Mount = ({
	tableId,
	columnId,
}) => {
	React.useEffect(() => () => {
		onUnmount(columnId);
	}, [
		columnId,
	]);

	return <React.Fragment />;
};
Mount = React.memo(Mount);
Mount.defaultProps = {
	tableId: 0,
	columnId: 0,
};

let DbColumn = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_COLUMN]);
	const _dialogOpenFlag = !!dialog;
	const tableId = Number((dialog || {}).tableId || 0);
	const [ columnNewId, setColumnNewId ] = React.useState(() => Date.now());
	const columnId = Number((dialog || {}).columnId || 0);
	const name = useSelector((state) => ((state.db.tempValue[columnId || columnNewId] || {}).tempValue || {}).name);
	const description = useSelector((state) => ((state.db.tempValue[columnId || columnNewId] || {}).tempValue || {}).description);
	const required = useSelector((state) => ((state.db.tempValue[columnId || columnNewId] || {}).tempValue || {}).required);
	const dataTypeId = useSelector((state) => ((state.db.tempValue[columnId || columnNewId] || {}).tempValue || {}).data_type_id ?? '');
	const isDisabled = useSelector((state) => ((state.db.columns || {})[columnId] || {}).data_type_id === DATA_TYPE_ID.id);
	const [ error, setError ] = React.useState(() => ({
		name: false,
	}));
	const _onSave = React.useCallback((e) => onSave(e, tableId, columnId, columnNewId, setError), [
		tableId,
		columnId,
		columnNewId,
		setError,
	]);
	const _onSelectDataTypeId = React.useCallback((e) => onSelectDataTypeId(e, tableId, columnId || columnNewId), [
		tableId,
		columnId,
		columnNewId,
	]);
	const _onChangeName = React.useCallback((e) => onChange(e, tableId, columnId || columnNewId, 'name', setError), [
		tableId,
		columnId,
		columnNewId,
		setError,
	]);
	const _onChangeDescription = React.useCallback((e) => onChange(e, tableId, columnId || columnNewId, 'description'), [
		tableId,
		columnId,
		columnNewId,
	]);
	const _onCheckRequired = React.useCallback((e) => onCheckRequired(e, tableId, columnId || columnNewId), [
		tableId,
		columnId,
		columnNewId,
	]);

	React.useEffect(() => {
		_dialogOpenFlag && setColumnNewId(Date.now());
	}, [
		_dialogOpenFlag,
		setColumnNewId,

	]);

	return _dialogOpenFlag
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="sm"
			open={!!dialog}
			onClose={onClose(DIALOG_DB_COLUMN)}>
			<DialogTitle>
				<Title onClose={onClose(DIALOG_DB_COLUMN)}>
					{name
						? <React.Fragment>
							{getLang('cmpDialogDBColumnCol')} <b>{name}</b>
						</React.Fragment>
						: getLang('cmpDialogDBColumnNew')}
				</Title>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<Mount
						tableId={tableId}
						columnId={columnId || columnNewId} />
					<DialogContent dividers>
						<Box pb={1}>
							<SelectDataType
								required
								disabled={isDisabled}
								name="data_type_id"
								value={dataTypeId === DATA_TYPE_ID.id
									? DATA_TYPE_NUMBER.id
									: dataTypeId}
								onSelect={_onSelectDataTypeId}
								onFilter={(key) => {
									return dataTypes[key].id !== DATA_TYPE_ATOMIC.id
										&& dataTypes[key].id !== DATA_TYPE_OBJECT.id
										&& dataTypes[key].id !== DATA_TYPE_ARRAY.id
										&& dataTypes[key].id !== DATA_TYPE_ID.id
										&& dataTypes[key].id !== DATA_TYPE_NULL.id;
								}} />
						</Box>
						<Box py={1}>
							<InputText
								required
								name="name"
								label={getLang('cmpDialogDBColumnNameField')}
								onChange={_onChangeName}
								defaultValue={name}
								error={error.name}
								{ ...error.name
									? {
										helperText: getLang('cmpDialogDBColumnFieldIs'),
									}
									: {} } />
						</Box>
						<Box py={1}>
							<InputText
								multiline
								rows={3}
								label={getLang('cmpDialogDBColumnDescr')}
								name="description"
								onChange={_onChangeDescription}
								defaultValue={description} />
						</Box>
						<Box py={1}>
							<FormControlLabel
								name="required"
								label={getLang('cmpDialogDBColumnFieldRequir')}
								disabled={isDisabled}
								control={<Checkbox 
									checked={!!required}
									onChange={_onCheckRequired} />} />
						</Box>
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
								onClick={onClose(DIALOG_DB_COLUMN)}>
								{getLang('cmpDialogDBColumnCancel')}
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={_onSave}>
								{name
									? getLang('cmpDialogDBColumnSave')
									: getLang('cmpDialogDBColumnAdd')}
							</Button>
						</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

DbColumn = React.memo(DbColumn);
DbColumn.defaultProps = {
};

export default DbColumn;
