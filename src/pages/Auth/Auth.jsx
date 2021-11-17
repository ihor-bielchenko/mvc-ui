import React from 'react';
import { 
	Switch,
	Route, 
} from 'react-router-dom';
import PageScript from 'pages/Script';
import PageDatabase from 'pages/Database';
import {
	URL_PAGE_SCRIPT,
	URL_PAGE_SERVICE,
	URL_PAGE_DB,
} from 'consts/url.js';
import onMount from './onMount.js';
import onUnmount from './onUnmount.js';

let ServiceInside = () => {
	
	// onMount
	React.useEffect(() => {
		onMount();

		return () => {
			onUnmount();
		};
	}, []);

	return <React.Fragment>
		<Switch>
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
