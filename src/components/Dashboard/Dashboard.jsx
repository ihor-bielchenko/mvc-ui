import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { getLang } from 'components/Language';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_PROJECT_FORM } from 'consts/dialog.js';
import Project from './Project';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';


let Dashboard = () => {
	const data = useSelector((state) => ({ ...state.list.data }));

	React.useEffect(() => {
		onMount();
	}, []);

	React.useEffect(() => () => {
		onUnmount();
	}, []);

	return <React.Fragment>
		<Box pb={4}>
			<Button 
				onClick={onDialog(DIALOG_PROJECT_FORM)}
				startIcon={<AddIcon />}
				variant="outlined"
				color="primary">
				{getLang('cmpDashboardNewProj')}
			</Button>
		</Box>
		{Object.keys(data).map((projectId) => {
			return <React.Fragment key={projectId}>
				<Project projectId={Number(projectId)} />
			</React.Fragment>;
		})}
	</React.Fragment>;
};

Dashboard = React.memo(Dashboard);
Dashboard.defaultProps = {
};

export default Dashboard;
