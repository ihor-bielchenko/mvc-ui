import React from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from 'components/Header';
import Transition from 'components/Dialog/Transition.jsx';
import { DIALOG_JSON } from 'consts/dialog.js';
import onSubmit from './onSubmit.js';
import onDelete from './onDelete.js';
import onMount from './onMount.js';
import onClose from './onClose.js';

let Json = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_JSON]);
	const id = useSelector((state) => state.json.id);
	const name = useSelector((state) => state.json.name || '');
	const dialogOpenFlag = !!dialog;

	// onMount
	React.useEffect(() => {
		if (dialogOpenFlag) {
			onMount();
		}
	}, [
		dialogOpenFlag,
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
						? 'JSON-ответ: '+ name
						: 'Добавить JSON-ответ'}
				</Header>
			</DialogTitle>
			{dialogOpenFlag
				? <form onSubmit={onSubmit}>
					<DialogContent dividers>
						json
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
									type="submit"
									variant="outlined"
									color="primary"
									startIcon={<SaveIcon />}>
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
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}>
								Сохранить
							</Button>}
					</Box>
					</DialogActions>
				</form>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

Json = React.memo(Json);
Json.defaultProps = {
};

export default Json;
