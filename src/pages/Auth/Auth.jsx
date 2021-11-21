import React from 'react';
import { 
	Switch,
	Route, 
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import PageDashboard from 'pages/Dashboard';
import PageScript from 'pages/Script';
import PageDatabase from 'pages/Database';
import PageService from 'pages/Service';
import PageRoute from 'pages/Route';
import PageApi from 'pages/Api';
import Header from 'components/Header';
import onMountService from 'components/Service/onMount.js';
import {
	URL_PAGE_DASHBOARD,
	URL_PAGE_SCRIPT,
	URL_PAGE_SERVICE,
	URL_PAGE_DB,
	URL_PAGE_API,
} from 'consts/url.js';

let HeaderWrapper = ({ children }) => {
	return <React.Fragment>
		<Box 
			overflow="auto"
			height="100%">
			<Header />
			<Box 
				position="relative"
				width="calc(100% - 192px)"
				mx="auto">
				<Box p="4px">
					{children}
				</Box>
			</Box>
		</Box>
	</React.Fragment>;
};
HeaderWrapper = React.memo(HeaderWrapper);
HeaderWrapper.defaultProps = {
};

let ServiceInside = () => {
	React.useEffect(() => {
		onMountService();
	}, []);

	return <React.Fragment>
		<Switch>
			<Route 
				exact
				path={`/:projectId/${URL_PAGE_SERVICE}/:serviceId/${URL_PAGE_DB}`}>
				<PageDatabase />
			</Route>
			<Route 
				exact
				path={`/:projectId/${URL_PAGE_SERVICE}/:serviceId`}>
					<HeaderWrapper>
						<PageService />
					</HeaderWrapper>
			</Route>
			<Route 
				exact
				path={`/:projectId/${URL_PAGE_SERVICE}/:serviceId/${URL_PAGE_API}`}>
					<HeaderWrapper>
						<PageApi />
					</HeaderWrapper>
			</Route>
			<Route 
				exact
				path={`/:projectId/${URL_PAGE_SERVICE}/:serviceId/${URL_PAGE_API}/:routeId`}>
					<HeaderWrapper>
						<PageRoute />
					</HeaderWrapper>
			</Route>
		</Switch>
	</React.Fragment>;
};
ServiceInside = React.memo(ServiceInside);
ServiceInside.defaultProps = {
};

let AuthInside = () => {
	return <React.Fragment>
		<Switch>
			<Route 
				exact
				path={`/${URL_PAGE_DASHBOARD}`}>
				<HeaderWrapper>
					<PageDashboard />
				</HeaderWrapper>
			</Route>
			<Route path={`/:projectId/${URL_PAGE_SERVICE}/:serviceId`}>
				<ServiceInside />
			</Route>
			<Route 
				exact
				path={`/${URL_PAGE_SCRIPT}/:scriptId`}>
				<PageScript />
			</Route>
		</Switch>
	</React.Fragment>;
};

AuthInside = React.memo(AuthInside);

export default AuthInside;
