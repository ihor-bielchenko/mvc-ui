import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchProjectOne from 'fetch/projectOne.js';
import fetchServiceOne from 'fetch/serviceOne.js';
import getProjectId from './getProjectId.js';
import getServiceId from './getServiceId.js';
import { URL_PAGE_DASHBOARD } from 'consts/url.js';

const onMount = async (historyPush = () => {}) => {
	try {
		const url = window
			.location
			.pathname
			.split('/');
		const projectId = getProjectId();
		const serviceId = getServiceId();

		if (serviceId > 0) {
			onLoader(true);

			const services = Store().getState().services;
			const fetchServiceResponse = await fetchServiceOne(serviceId);
			const fetchServiceData = ((fetchServiceResponse || {}).data || {}).data || {};
		
			const fetchProjectResponse = await fetchProjectOne(projectId);
			const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || {};

			services.form = { ...fetchServiceData };
			services.form.project = { ...fetchProjectData };
			Store().dispatch({
				type: 'services',
				payload: () => ({ ...services }),
			});
			if (url.length === 4) {
				onLoader(false);
			}
		}
	}
	catch (err) {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: true,
				message: axiosError(err),
				vertical: 'bottom',
				horizontal: 'right',
			}),
		});
		historyPush('/'+ URL_PAGE_DASHBOARD);
	}
};

export default onMount;
