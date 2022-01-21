import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { getLang } from 'components/Language';
import Title from 'components/Title';
import onValidate from 'components/Dialog/Func/Props/onValidate.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { 
	SOURCE_TYPE_COOKIE,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import onDialog from '../onDialog.js';
import onClear from './onClear.js';
import onValueScript from './onValueScript.js';
import onClose from './onClose.js';
import onSubmit from './onSubmit.js';

export let Input = ({
	workspaceId,
	id,
	label,
	placeholder,
}) => {
	const dataTypeId = useSelector((state) => (state.jsObject.data[id] || {}).data_type_id);
	const value = useSelector((state) => state.jsObject.tempValue.value || '');
	const _onClear = React.useCallback((e) => onClear(e, workspaceId, id), [
		workspaceId,
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidate(dataTypeId),
	})(e), [
		id,
		dataTypeId,
	]);
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);

	return <React.Suspense fallback={<Typography>{getLang('cmpDialogSourceCookieWait')}</Typography>}>
		<Component 
			required
			menu
			onMenu={_onMenu}
			onValue={_onMenu}
			onDelete={_onClear}
			name="value"
			type="text"
			label={label}
			placeholder={placeholder}
			defaultValue={value} />
	</React.Suspense>;
};
Input = React.memo(Input);
Input.defaultProps = {
	label: getLang('cmpDialogSourceCookieName'),
	placeholder: getLang('cmpDialogSourceCookieForExamp'),
};

let SourceCookie = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_COOKIE.id]);
	const id = (dialog || {}).id;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
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
						{getLang('cmpDialogSourceCookieReq')}
					</Title>
				</DialogTitle>
				<form onSubmit={_onSubmit}>
					<DialogContent dividers>
						<Input
							workspaceId={workspaceId}
							id={id} />
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
								{getLang('cmpDialogSourceCookieCancel')}
							</Button>
							<Button 
								variant="outlined"
								color="primary"
								type="submit"
								startIcon={<CheckIcon />}>
								{getLang('cmpDialogSourceCookieAdd')}
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
