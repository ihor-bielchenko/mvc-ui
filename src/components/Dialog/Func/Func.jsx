import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Transition from 'components/Dialog/Transition.jsx';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from 'components/Header';
import Func from 'components/Func';
import { DIALOG_FUNC } from 'consts/dialog.js';
import onSave from './onSave.js';
import onDelete from './onDelete.js';
import onMount from './onMount.js';
import onClose from './onClose.js';

let DialogFunc = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_FUNC]);
	const existId = (dialog || {}).id || 0;
	const id = useSelector((state) => (state.func || {}).id);
	const name = useSelector((state) => (state.func || {}).name || '');
	const dialogOpenFlag = !!dialog;

	// onMount
	React.useEffect(() => {
		(dialogOpenFlag && existId > 0) && onMount(existId);
	}, [
		dialogOpenFlag,
		existId,
	]);

	return dialogOpenFlag
		? <Dialog
			fullScreen
			TransitionComponent={Transition}
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="lg"
			open={dialogOpenFlag}
			onClose={onClose}>
			<DialogTitle>
				<Header onClose={onClose}>
					{id >= 1
						? 'Действие: '+ name
						: 'Добавить действие'}
				</Header>
			</DialogTitle>
			{dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<Func />
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
						{id >= 1
							? <ButtonGroup>
								<Button
									disabled={!name}
									variant="outlined"
									color="primary"
									startIcon={<SaveIcon />}
									onClick={onSave}>
									Сохранить
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									startIcon={<DeleteIcon />}
									onClick={onDelete}>
									Удалить
								</Button>
							</ButtonGroup>
							: <Button
								disabled={!name}
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={onSave}>
								Сохранить
							</Button>}
					</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

DialogFunc = React.memo(DialogFunc);
DialogFunc.defaultProps = {
};

export default DialogFunc;
