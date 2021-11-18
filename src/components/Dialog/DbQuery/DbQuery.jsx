import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Title from 'components/Title';
import InputText from 'components/Input/Text';
import onValidateSource from 'components/Dialog/Func/Props/onValidate.js';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import onDialog from '../onDialog.js';
import onChange from './onChange.js';
import onCheck from './onCheck.js';
import onClose from './onClose.js';
import onSubmit from './onSubmit.js';
import onValueScript from './onValueScript.js';
import onClear from './onClear.js';

let DbQuery = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_QUERY]);
	const id = (dialog || {}).id || 0;
	const value = useSelector((state) => ((state.jsObject.tempValue.query || {})[id] || {}).value || '');
	const left = useSelector((state) => ((state.jsObject.tempValue.query || {})[id] || {}).left || '');
	const right = useSelector((state) => ((state.jsObject.tempValue.query || {})[id] || {}).right || '');
	const _onChange = React.useCallback((e) => onChange(e, id), [
		id,
	]);
	const _onCheckLeft = React.useCallback((e) => onCheck(e, id), [
		id,
	]);
	const _onCheckRight = React.useCallback((e) => onCheck(e, id, 'right'), [
		id,
	]);
	const _onSave = React.useCallback((e) => onSubmit(e, id, 'left'), [
		id,
	]);
	const _onClear = React.useCallback((e) => onClear(e, id), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidateSource(DATA_TYPE_TEXT.id),
	})(e), [
		id,
	]);

	return !!dialog
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="sm"
			open={!!dialog}
			onClose={onClose}>
			<DialogTitle>
				<Title onClose={onClose}>
					Поисковый запрос
				</Title>
			</DialogTitle>
			{!!dialog
				? <React.Fragment>
					<DialogContent dividers>
						<input
							type="hidden"
							name="id"
							value={id} />
						<InputText 
							required
							menu
							onMenu={_onMenu}
							onValue={_onMenu}
							onDelete={_onClear}
							onChange={_onChange}
							label="Название"
							type="text"
							name="value"
							defaultValue={value || ''} />
						<Box py={2}>
							<FormControlLabel
								label="Начало колонки базы данных должно совпадать с указанным значением"
								control={<Checkbox 
									name="left"
									checked={!!left} />}
									onChange={_onCheckLeft} />
						</Box>
						<Box py={2}>
							<FormControlLabel
								label="Конец колонки базы данных должен совпадать с указанным значением"
								control={<Checkbox 
									name="right"
									checked={!!right}
									onChange={_onCheckRight} />} />
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
								onClick={onClose}>
								Отмена
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={_onSave}>
								Сохранить
							</Button>
						</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

export default DbQuery;
