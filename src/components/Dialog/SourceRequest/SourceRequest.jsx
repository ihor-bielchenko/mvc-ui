import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Header from 'components/Header';
import InputText from 'components/Input/Text';
import { 
	SOURCE_REQUEST,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import {
	COLUMN_NUMBER,
	COLUMN_TEXT,
} from 'structures/columnTypes.js';
import onDialog from '../onDialog.js';
import onChangeByLogic from '../onChangeByLogic.js';
import onClear from '../onClear.js';
import onClose from './onClose.js';
import onSubmit from './onSubmit.js';

const _onMenu = onDialog(SOURCE_SCRIPT.id, {
	onClickEntity: onChangeByLogic,
	formatValidating: () => ([
		COLUMN_NUMBER.id,
		COLUMN_TEXT.id,
	]),
});
let SourceRequest = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_REQUEST.id]);
	const bodyId = (dialog || {}).name;
	const value = useSelector((state) => state.prop.tempValue.value || '');
	const _onSubmit = React.useCallback((e) => onSubmit(e, bodyId), [
		bodyId,
	]);
	const _onClear = React.useCallback((e) => onClear(e, bodyId), [
		bodyId,
	]);

	return <React.Fragment>
		<Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			open={!!dialog}
			onClose={onClose}>
			<DialogTitle>
				<Header onClose={onClose}>
					Параметр входящего запроса
				</Header>
			</DialogTitle>
			<form onSubmit={_onSubmit}>
				<DialogContent dividers>
					<InputText 
						required
						menu
						onMenu={_onMenu}
						onValue={_onMenu}
						onDelete={_onClear}
						name="value"
						type="text"
						label="Название"
						placeholder="Например, user_id"
						defaultValue={value} />
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
							variant="outlined"
							color="primary"
							type="submit"
							startIcon={<CheckIcon />}>
							Добавить
						</Button>
					</Box>
				</DialogActions>
			</form>
		</Dialog>
	</React.Fragment>;
};

SourceRequest = React.memo(SourceRequest);

export default SourceRequest;
