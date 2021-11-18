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
import Title from 'components/Title';
import InputText from 'components/Input/Text';
import onValidate from 'components/Dialog/Func/Props/onValidate.js';
import { 
	SOURCE_TYPE_COOKIE,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import onDialog from '../onDialog.js';
import onClear from './onClear.js';
import onValueScript from './onValueScript.js';
import onClose from './onClose.js';
import onSubmit from './onSubmit.js';

let SourceCookie = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_COOKIE.id]);
	const id = (dialog || {}).id;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const value = useSelector((state) => state.jsObject.tempValue.value || '');
	const _onClear = React.useCallback((e) => onClear(e, workspaceId, id), [
		workspaceId,
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
		id,
	]);
	const _onSubmit = React.useCallback((e) => onSubmit(e, id), [
		id,
	]);

	return !!dialog
		? <React.Fragment>
			<Dialog
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
				fullWidth
				open={!!dialog}
				onClose={onClose(SOURCE_TYPE_COOKIE.id)}>
				<DialogTitle>
					<Title onClose={onClose(SOURCE_TYPE_COOKIE.id)}>
						Куки входящего запроса
					</Title>
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
							label="Название значния"
							placeholder="Например, access_token"
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
								onClick={onClose(SOURCE_TYPE_COOKIE.id)}>
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
		</React.Fragment>
		: <React.Fragment />;
};

SourceCookie = React.memo(SourceCookie);

export default SourceCookie;
