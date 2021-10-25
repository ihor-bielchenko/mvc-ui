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
import Header from 'components/Header';
import InputText from 'components/Input/Text';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_NUMBER,
	DATA_TYPE_TEXT,
} from 'structures/dataTypes.js';
import onDialog from '../onDialog.js';
import onClose from './onClose.js';
import onSubmit from './onSubmit.js';
import onChangeByLogic from './onChangeByLogic.js';
import onClear from './onClear.js';

let DbQuery = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_QUERY]);
	const name = (dialog || {}).name || 0;
	const value = useSelector((state) => ((state.jsObject.tempValue.query || {})[name] || {}).value || '');
	const left = useSelector((state) => ((state.jsObject.tempValue.query || {})[name] || {}).left || '');
	const right = useSelector((state) => ((state.jsObject.tempValue.query || {})[name] || {}).right || '');
	const [ logicValue, setLogicValue ] = React.useState(() => (typeof value === 'object' && 
		value.source_type_id === SOURCE_TYPE_SCRIPT.id)
		? value
		: undefined);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickEntity: (e, entityId, id) => onChangeByLogic(e, entityId, id, setLogicValue),
		formatValidating: () => ([
			DATA_TYPE_NUMBER.id,
			DATA_TYPE_TEXT.id,
		]),
	})(e), [
		setLogicValue,
	]);
	const _onClear = React.useCallback((e) => onClear(e, name, setLogicValue), [
		name,
		setLogicValue,
	]);
	const _onClose = React.useCallback((e) => onClose(e, setLogicValue), [
		setLogicValue,
	]);
	const _onSubmit = React.useCallback((e) => onSubmit(e, logicValue, setLogicValue), [
		logicValue,
		setLogicValue,
	]);

	return !!dialog
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="sm"
			open={!!dialog}
			onClose={_onClose}>
			<DialogTitle>
				<Header onClose={_onClose}>
					Поисковый запрос
				</Header>
			</DialogTitle>
			{!!dialog
				? <form onSubmit={_onSubmit}>
					<DialogContent dividers>
						<input
							type="hidden"
							name="id"
							value={name} />
						<InputText 
							required
							menu
							onMenu={_onMenu}
							onValue={_onMenu}
							onDelete={_onClear}
							label="Название"
							type="text"
							name="value"
							defaultValue={logicValue || value || ''} />
						<Box py={2}>
							<FormControlLabel
								label="Начало колонки базы данных должно совпадать с указанным значением"
								control={<Checkbox 
									name="left"
									defaultChecked={!!left} />} />
						</Box>
						<Box py={2}>
							<FormControlLabel
								label="Конец колонки базы данных должен совпадать с указанным значением"
								control={<Checkbox 
									name="right"
									defaultChecked={!!right} />} />
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
								onClick={_onClose}>
								Отмена
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}>
								Сохранить
							</Button>
						</Box>
					</DialogActions>
				</form>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

export default DbQuery;
