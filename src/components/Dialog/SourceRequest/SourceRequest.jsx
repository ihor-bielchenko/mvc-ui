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
import onSubmit from 'components/Dialog/SourceCookie/onSubmit.js';
import onClose from 'components/Dialog/SourceCookie/onClose.js';
import onValidate from 'components/Dialog/Func/Props/onValidate.js';
import { 
	SOURCE_TYPE_REQUEST,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import onValueScript from '../SourceCookie/onValueScript.js';
import onClear from '../SourceCookie/onClear.js';
import onDialog from '../onDialog.js';

let SourceRequest = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_REQUEST.id]);
	const id = (dialog || {}).id;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const value = useSelector((state) => state.jsObject.tempValue.value || '');
	const _onClear = React.useCallback((e) => onClear(e, workspaceId, id, SOURCE_TYPE_REQUEST.id), [
		workspaceId,
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidate(DATA_TYPE_TEXT.id),
	})(e), [
		id,
	]);
	const _onSubmit = React.useCallback((e) => onSubmit(e, id, SOURCE_TYPE_REQUEST.id), [
		id,
	]);

	return <React.Fragment>
		<Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			open={!!dialog}
			onClose={onClose(SOURCE_TYPE_REQUEST.id)}>
			<DialogTitle>
				<Title onClose={onClose(SOURCE_TYPE_REQUEST.id)}>
					Параметр входящего запроса
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
							onClick={onClose(SOURCE_TYPE_REQUEST.id)}>
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
