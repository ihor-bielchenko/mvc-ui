import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onClose from '../onClose.js';

let DeleteConfirm = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DELETE_CONFIRM]);
	const _title = ((dialog || {}).title) || 'Вы уверены, что хотите удалить этот элемент?';
	const _handleText = ((dialog || {}).handleText) || 'Удалить';
	const _onDelete = ((dialog || {}).onDelete) || (() => {});
	const _onClick = React.useCallback(_onDelete, [ 
		_onDelete, 
	]);

	return !!dialog
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="xs"
			open={!!dialog}
			onClose={onClose(DIALOG_DELETE_CONFIRM)}>
			<DialogContent dividers>
				<Typography variant="h6">
					{_title}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Box 
					p={2}
					width="100%"
					display="flex"
					justifyContent="space-between">
					<Button 
						variant="outlined"
						color="primary"
						startIcon={<CheckIcon />}
						onClick={_onClick}>
						{_handleText}
					</Button>
					<Button 
						variant="outlined"
						color="secondary"
						startIcon={<CloseIcon />}
						onClick={onClose(DIALOG_DELETE_CONFIRM)}>
						Отмена
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
		: <React.Fragment />;
};

DeleteConfirm = React.memo(DeleteConfirm);

export default DeleteConfirm;
