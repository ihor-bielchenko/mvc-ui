import React from 'react';
import { 
	Switch,
	Route, 
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import PageDashboard from 'pages/Dashboard';
import PageScript from 'pages/Script';
import PageDatabase from 'pages/Database';
import Header from 'components/Header';
import {
	URL_PAGE_DASHBOARD,
	URL_PAGE_SCRIPT,
	URL_PAGE_SERVICE,
	URL_PAGE_DB,
} from 'consts/url.js';

let ServiceInside = () => {
	return <React.Fragment>
		<Switch>
			<Route 
				exact
				path={`/${URL_PAGE_DASHBOARD}`}>
				<Box 
					overflow="auto"
					height="100%">
					<Header />
					<Box 
						position="relative"
						width="calc(100% - 192px)"
						mx="auto">
						<Box p="4px">
							<PageDashboard />
						</Box>
					</Box>
				</Box>
			</Route>
			<Route 
				exact
				path={`/${URL_PAGE_SCRIPT}/:scriptId`}>
				<PageScript />
			</Route>
			<Route 
				exact
				path={`/:projectId/${URL_PAGE_SERVICE}/:serviceId/${URL_PAGE_DB}`}>
				<PageDatabase />
			</Route>
		</Switch>
	</React.Fragment>;
};

ServiceInside = React.memo(ServiceInside);

export default ServiceInside;
