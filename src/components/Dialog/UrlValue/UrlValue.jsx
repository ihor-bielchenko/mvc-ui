import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Title from 'components/Title';
import InputText from 'components/Input/Text';
import onClose from '../onClose.js';
import { DIALOG_URL_VALUE } from 'consts/dialog.js';
import onSubmit from './onSubmit.js';
import onValidate from 'components/Input/Validate/strOrNum.js';

let UrlValue = ({ history }) => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_URL_VALUE]);
	const index = (dialog || {}).index ?? -1;
	const value = useSelector((state) => (((state.routes.form || {}).url || [])[index] || {}).value || '');
	const _onSubmit = React.useCallback((e) => onSubmit(e, index), [
		index,
	]);
	const _dialogOpenFlag = !!dialog;

	return _dialogOpenFlag
		? <React.Fragment>
			<Dialog
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
				fullWidth
				maxWidth="sm"
				open={_dialogOpenFlag}
				onClose={onClose(DIALOG_URL_VALUE)}>
				<form onSubmit={_onSubmit}>
					<DialogTitle>
						<Title onClose={onClose(DIALOG_URL_VALUE)}>
							{index > 0
								? 'Редактировать url параметр'
								: 'Добавить url параметр'}
						</Title>
					</DialogTitle>
					<DialogContent dividers>
						<Box my={2}>
							<InputText 
								required
								label="Путь"
								placeholder="Например: test"
								type="text"
								name="value"
								defaultValue={value}
								onInput={onValidate} />
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
								onClick={onClose(DIALOG_URL_VALUE)}>
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
			</Dialog>
		</React.Fragment>
		: <React.Fragment />;
};

UrlValue = React.memo(UrlValue);
UrlValue.defaultProps = {
};

export default withRouter(UrlValue);
