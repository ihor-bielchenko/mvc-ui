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
import { getLang } from 'components/Language';
import Title from 'components/Title';
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
				<Title onClose={onClose(DIALOG_KEY_EXISTS)}>
					{getLang('cmpDialogKeyExistsFind')}
				</Title>
			</DialogTitle>
			{!!dialog
				? <React.Fragment>
					<DialogContent dividers>
						<Typography>
							{getLang('cmpDialogKeyExistsNewElem')}<br />
							{getLang('cmpDialogKeyExistsThisElem')}
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
								{getLang('cmpDialogKeyExistsCancel')}
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={merge}>
								{getLang('cmpDialogKeyExistsCont')}
							</Button>
						</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

export default KetExists;
