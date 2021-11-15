import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Header from 'components/Header';
import { DIALOG_KEY_EXISTS } from 'consts/dialog.js';
import onClose from '../onClose.js';

let KetExists = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_KEY_EXISTS]);
	const merge = (dialog || {}).merge;

	return !!dialog
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="sm"
			open={!!dialog}
			onClose={onClose(DIALOG_KEY_EXISTS)}>
			<DialogTitle>
				<Header onClose={onClose(DIALOG_KEY_EXISTS)}>
					Найдены совпадения ключей
				</Header>
			</DialogTitle>
			{!!dialog
				? <React.Fragment>
					<DialogContent dividers>
						<Typography>
							Новые элементы содержат ключи которые уже существуют. <br />
							Этим элементам будут присвоены новые уникальные значения
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
								color="secondary"
								startIcon={<CloseIcon />}
								onClick={onClose(DIALOG_KEY_EXISTS)}>
								Отмена
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={merge}>
								Продолжить
							</Button>
						</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

export default KetExists;
