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
import { getLang } from 'components/Language';
import Title from 'components/Title';
import { Input } from 'components/Dialog/SourceCookie';
import onSubmit from 'components/Dialog/SourceCookie/onSubmit.js';
import onClose from 'components/Dialog/SourceCookie/onClose.js';
import { SOURCE_TYPE_HEADER } from 'structures/sourceTypes.js';

let SourceHeader = () => {
	const dialog = useSelector((state) => state.dialogs[SOURCE_TYPE_HEADER.id]);
	const id = (dialog || {}).id;
	const workspaceId = (dialog || {}).workspaceId ?? 0;
	const _onSubmit = React.useCallback((e) => onSubmit(e, id, SOURCE_TYPE_HEADER.id), [
		id,
	]);

	return <React.Fragment>
		<Dialog
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
			fullWidth
			open={!!dialog}
			onClose={onClose(SOURCE_TYPE_HEADER.id)}>
			<DialogTitle>
				<Title onClose={onClose(SOURCE_TYPE_HEADER.id)}>
					{getLang('cmpDialogSourceHeader')}
				</Title>
			</DialogTitle>
			<form onSubmit={_onSubmit}>
				<DialogContent dividers>
					<Input
						workspaceId={workspaceId}
						id={id}
						label={getLang('cmpDialogSourceHeaderNameValue')}
						placeholder={getLang('cmpDialogSourceHeaderForExamp')} />
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
							onClick={onClose(SOURCE_TYPE_HEADER.id)}>
							{getLang('cmpDialogSourceHeaderCancel')}
						</Button>
						<Button 
							variant="outlined"
							color="primary"
							type="submit"
							startIcon={<CheckIcon />}>
							{getLang('cmpDialogSourceHeaderAdd')}
						</Button>
					</Box>
				</DialogActions>
			</form>
		</Dialog>
	</React.Fragment>;
};

SourceHeader = React.memo(SourceHeader);

export default SourceHeader;
