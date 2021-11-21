import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import onMountDb from 'components/Database/onMount.js';
import onMountDbColumns from 'components/Database/Columns/onMount.js';
import getScriptId from 'components/Script/getScriptId.js';
import axiosError from 'utils/axiosError.js';
import fetchProjectOne from 'fetch/projectOne.js';
import fetchServiceOne from 'fetch/serviceOne.js';
import fetchRouteMany from 'fetch/routeMany.js';
import fetchProjectMany from 'fetch/projectMany.js';
import getProjectId from './getProjectId.js';
import getServiceId from './getServiceId.js';
import { URL_PAGE_DASHBOARD } from 'consts/url.js';

const onMount = async (historyPush = () => {}) => {
	try {
		const {
			services,
			routes,
		} = Store().getState();
		const projectId = getProjectId();
		const serviceId = getServiceId();
		const scriptId = getScriptId();

		onLoader(true);

		if (serviceId > 0) {
			await onMountDb();
			onMountDbColumns();

			const fetchServiceResponse = await fetchServiceOne(serviceId);
			const fetchServiceData = ((fetchServiceResponse || {}).data || {}).data || {};

			services.form = { ...fetchServiceData };
		}
		if (projectId > 0) {
			const fetchProjectResponse = await fetchProjectOne(projectId);
			const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || {};
		
			if (scriptId > 0) {
				const fetchProjectResponse = await fetchProjectMany();
				const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || [];
				const collectorServices = [];

				const fetchRouteResponse = await fetchRouteMany(1, {
					limit: 999,
					filter: JSON.stringify({ service_id: scriptId }),
				});
				const fetchRouteData = ((fetchRouteResponse || {}).data || {}).data || [];

				fetchProjectData.forEach((project) => {
					project.services.forEach(({ 
						id, 
						name, 
					}) => {
						collectorServices.push({
							id,
							name,
						});
					});
				});
				services.data = [ ...collectorServices ];
				routes.data = [ ...fetchRouteData ];
			}
			else {
				services.form.project = { ...fetchProjectData };
			}
		}
		Store().dispatch({
			type: 'services',
			payload: () => ({ ...services }),
		});
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
	onLoader(false);
};

export default onMount;
