import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Title from 'components/Title';
import InputText from 'components/Input/Text';
import onValidateSubdomain from 'components/Input/Validate/strOrNum.js';
import onClose from '../onClose.js';
import { DIALOG_PROJECT_FORM } from 'consts/dialog.js';
import onSubmit from './onSubmit.js';
import { getLang } from 'components/Language';

let ProjectForm = ({ history }) => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROJECT_FORM]);
	const projectId = (dialog || {}).projectId || 0;
	const domain = useSelector((state) => state.account.path);
	const subdomainPath = useSelector((state) => (state.list.data[projectId] || {}).subdomain_path);
	const name = useSelector((state) => (state.list.data[projectId] || {}).name);
	const _onSubmit = React.useCallback((e) => onSubmit(e, projectId), [
		projectId,
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
				onClose={onClose(DIALOG_PROJECT_FORM)}>
				<form onSubmit={_onSubmit}>
					<DialogTitle>
						<Title onClose={onClose(DIALOG_PROJECT_FORM)}>
							{projectId > 0
								? getLang('Edit')
								: getLang('TestCreateProject')}
						</Title>
					</DialogTitle>
					<DialogContent dividers>
						<Box my={2}>
							<InputText 
								required
								label={getLang('ProjectTitle')}
								placeholder={getLang('ProjectExample')}
								type="text"
								name="name"
								defaultValue={name} />
						</Box>
						<Grid 
							container
							spacing={1}
							alignItems="center">
							<Grid
								item
								xs={5}>
								<InputText
									required
									label={getLang('ProjectSub')}
									placeholder="my-project"
									type="text"
									name="subdomain_path"
									defaultValue={subdomainPath}
									onInput={onValidateSubdomain} />
							</Grid>
							<Grid
								item
								xs="auto">
								<Button style={{ textTransform: 'lowercase' }}>
									<Typography variant="h6">
										.{domain}
									</Typography>
								</Button>
							</Grid>
						</Grid>
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
								onClick={onClose(DIALOG_PROJECT_FORM)}>
								{getLang('Cancel')}
							</Button>
							<Button 
								type="submit"
								variant="outlined"
								color="primary"
								startIcon={<SaveIcon />}>
								{getLang('Save')}
							</Button>
						</Box>
					</DialogActions>
				</form>
			</Dialog>
		</React.Fragment>
		: <React.Fragment />;
};

ProjectForm = React.memo(ProjectForm);
ProjectForm.defaultProps = {
};

export default withRouter(ProjectForm);
