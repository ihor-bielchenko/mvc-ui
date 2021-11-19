import React from 'react';
// import { useSelector } from 'react-redux';
import ComponentDashboard from 'components/Dashboard';

let Dashboard = () => {
	return <React.Fragment>
		<ComponentDashboard />
	</React.Fragment>;
};

Dashboard = React.memo(Dashboard);
Dashboard.defaultProps = {
};

export default Dashboard;
