import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { getLang } from 'components/Language';
import onDialog from 'components/Dialog/onDialog.js';
import { 
	DIALOG_SERVICE_TEMPLATE,
	DIALOG_PROJECT_FORM,
	DIALOG_DELETE_CONFIRM, 
} from 'consts/dialog.js';
import SlotService from '../Slot/Service';
import SlotCreate from '../Slot/Create';
import onDelete from './onDelete.js';

let Project = ({ projectId }) => {
	const domain = useSelector((state) => state.account.path);
	const name = useSelector((state) => (state.list.data[projectId] || {}).name || '');
	const subdomainPath = useSelector((state) => (state.list.data[projectId] || {}).subdomain_path || '');
	const services = useSelector((state) => (state.list.data[projectId] || {}).services || []);
	const _onDelete = React.useCallback((e) => onDelete(e, projectId), [
		projectId,
	]);

	return <React.Fragment>
		<Box pb="48px">
			<Grid 
				container
				alignItems="flex-start"
				justifyContent="space-between"
				style={{
					borderTop: '1px solid #D3D3D3',
					paddingTop: 24,
					paddingBottom: 14,
				}}>
				<Grid item>
					<Typography variant="h5">
						{name}
					</Typography>
					<Typography variant="body2">
						{subdomainPath}.{domain}
					</Typography>
				</Grid>
				<Grid item>
					<ButtonGroup size="small">
						<Button
							onClick={onDialog(DIALOG_SERVICE_TEMPLATE, {
								projectId,
							})}>
							<AddIcon />
						</Button>
						<Button 
							disabled
							startIcon={<GroupIcon />}>
							{getLang('cmpDashbordProjPatric')}
						</Button>
						<Button 
							startIcon={<EditIcon />}
							onClick={onDialog(DIALOG_PROJECT_FORM, {
								projectId,
							})}>
							{getLang('cmpDashbordProjChange')}
						</Button>
						<Button 
							color="secondary"
							onClick={onDialog(DIALOG_DELETE_CONFIRM, {
								onDelete: _onDelete,
							})}>
							<DeleteIcon />
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
			<Grid 
				container
				spacing={2}>
				{Object.keys(services).map((serviceId) => {
					return <React.Fragment key={serviceId}>
						<SlotService
							projectId={projectId}
							serviceId={Number(serviceId)} />
					</React.Fragment>;
				})}
				<SlotCreate projectId={projectId} />
			</Grid>
		</Box>
	</React.Fragment>;
};

Project = React.memo(Project);
Project.defaultProps = {
	projectId: 0,
};

export default Project;
