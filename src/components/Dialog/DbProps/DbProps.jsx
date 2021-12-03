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
import Title from 'components/Title';
import DatabaseSearch from 'components/Database/Search';
import { DIALOG_DB_PROPS } from 'consts/dialog.js';
import onClose from '../onClose.js';
import onApply from './onApply.js';
import onClear from './onClear.js';

let DbProps = () => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_DB_PROPS]);
	const _dialogOpenFlag = !!dialog;

	return _dialogOpenFlag
		? <Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			maxWidth="md"
			open={!!dialog}
			onClose={onClose(DIALOG_DB_PROPS)}>
			<DialogTitle>
				<Title onClose={onClose(DIALOG_DB_PROPS)}>
					Параметры запроса:
				</Title>
			</DialogTitle>
			{_dialogOpenFlag
				? <React.Fragment>
					<DialogContent dividers>
						<DatabaseSearch 
							disabledQuery
							disabledSource />
					</DialogContent>
					<DialogActions>
						<Box 
							p={2}
							width="100%"
							display="flex"
							justifyContent="space-between">
							<ButtonGroup>
								<Button 
									variant="outlined"
									color="secondary"
									startIcon={<CloseIcon />}
									onClick={onClose(DIALOG_DB_PROPS)}>
									Отмена
								</Button>
								<Button 
									variant="outlined"
									color="secondary"
									startIcon={<DeleteIcon />}
									onClick={onClear}>
									Очистить
								</Button>
							</ButtonGroup>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}
								onClick={onApply}>
								Применить
							</Button>
						</Box>
					</DialogActions>
				</React.Fragment>
				: <React.Fragment />}
		</Dialog>
		: <React.Fragment />;
};

DbProps = React.memo(DbProps);
DbProps.defaultProps = {
};

export default DbProps;
