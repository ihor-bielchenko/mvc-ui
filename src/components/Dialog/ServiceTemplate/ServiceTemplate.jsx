import React from 'react';
import { useSelector } from 'react-redux';
import { 
	withRouter,
	Link, 
} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Title from 'components/Title';
import DnsIcon from '@material-ui/icons/Dns';
import ForumIcon from '@material-ui/icons/Forum';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { getLang } from 'components/Language';
import onClose from '../onClose.js';
import { DIALOG_SERVICE_TEMPLATE } from 'consts/dialog.js';
import { URL_PAGE_SERVICE } from 'consts/url.js';

let ServiceTemplate = ({ history }) => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_SERVICE_TEMPLATE]);
	const projectId = (dialog || {}).projectId || 0;
	const _dialogOpenFlag = !!dialog;

	return _dialogOpenFlag 
		? <React.Fragment>
			<Dialog
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
				fullWidth
				maxWidth="sm"
				open={_dialogOpenFlag}
				onClose={onClose(DIALOG_SERVICE_TEMPLATE)}>
				<DialogTitle>
					<Title onClose={onClose(DIALOG_SERVICE_TEMPLATE)}>
						{getLang('cmpDialogSerTemplateSelectType')}
					</Title>
				</DialogTitle>
				<DialogContent dividers>
					<Box align="center">
						<Typography	
							variant="body2"
							color="textSecondary">
							{getLang('cmpDialogSerTemplateStorageAndManag')}
						</Typography>
						<Box 
							mt={2}
							mb={5}>
							<Button 
								component={Link}
								to={`/${projectId}/${URL_PAGE_SERVICE}/0`}
								onClick={onClose(DIALOG_SERVICE_TEMPLATE)}
								variant="outlined" 
								color="primary"
								startIcon={<DnsIcon />}>
								<Typography variant="subtitle1">
									{getLang('cmpDialogSerTemplateDefault')}
								</Typography>
							</Button>
						</Box>
						<Typography	
							variant="h5"
							color="textSecondary">
							{getLang('cmpDialogSerTemplateOr')}
						</Typography>
						<Typography	
							variant="body2"
							color="textSecondary">
							{getLang('cmpDialogSerTemplateSpecAction')}
						</Typography>
						<Box my={2}>
							<Button 
								disabled
								variant="outlined" 
								color="secondary"
								startIcon={<ForumIcon />}
								onClick={() => {}}>
								<Typography variant="subtitle1">
									{getLang('cmpDialogSerTemplateComun')}
								</Typography>
							</Button> <Button 
								disabled
								variant="outlined" 
								color="secondary"
								startIcon={<ShoppingCartIcon />}
								onClick={() => {}}>
								<Typography variant="subtitle1">
									{getLang('cmpDialogSerTemplateComerc')}
								</Typography>
							</Button>
						</Box>
						<Box my={1}>
							<Button 
								disabled
								variant="outlined" 
								color="secondary"
								startIcon={<PermMediaIcon />}
								onClick={() => {}}>
								<Typography variant="subtitle1">
									{getLang('cmpDialogSerTemplateFile')}
								</Typography>
							</Button>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Box 
						p={2}
						width="100%">
						<Button 
							variant="outlined"
							color="secondary"
							startIcon={<CloseIcon />}
							onClick={onClose(DIALOG_SERVICE_TEMPLATE)}>
							{getLang('cmpDialogSerTemplateCancel')}
						</Button>
					</Box>
				</DialogActions>
			</Dialog>
		</React.Fragment>
		: <React.Fragment />;
};

ServiceTemplate = React.memo(ServiceTemplate);
ServiceTemplate.defaultProps = {
};

export default withRouter(ServiceTemplate);
