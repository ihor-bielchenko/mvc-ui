import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getProjectId from 'components/Service/getProjectId.js';
import getServiceId from 'components/Service/getServiceId.js';
import axiosError from 'utils/axiosError.js';
import fetchRouteCreate from 'fetch/routeCreate.js';
import fetchRouteUpdate from 'fetch/routeUpdate.js';
import fetchRouteOne from 'fetch/routeOne.js';
import { 
	URL_PAGE_SERVICE,
	URL_PAGE_API, 
} from 'consts/url.js';

let interval;
const onSave = async (e, historyPush) => {
	onLoader(true);

	try {
		const routes = Store().getState().routes;
		const serviceId = getServiceId();
		const projectId = getProjectId();

		if (!(serviceId > 0)) {
			throw new Error('undefined serviceId');
		}
		if (routes.form.id > 0) {
			await fetchRouteUpdate(routes.form.id, {
				name: routes.form.name,
				method_id: routes.form.method_id,
				protocol_id: routes.form.protocol_id,
				url: JSON.stringify(routes.form.url || []),
			});
		}
		else {
			const fetchRouteResponse = await fetchRouteCreate({
				service_id: serviceId,
				name: routes.form.name,
				method_id: routes.form.method_id,
				protocol_id: routes.form.protocol_id,
				url: JSON.stringify(routes.form.url || []),
			});
			const fetchRouteData = ((fetchRouteResponse || {}).data || {}).data || {};
			const controllerId = fetchRouteData.id;

			routes.form.id = controllerId;
			routes.form.script_id = 0;
			Store().dispatch({
				type: 'routes',
				payload: () => ({ ...routes }),
			});

			onLoader(true);
			interval = setInterval(async () => {
				if (controllerId > 0) {
					const fetchRouteGetResponse = await fetchRouteOne(controllerId);
					const fetchRouteGetData = ((fetchRouteGetResponse || {}).data || {}).data || {};
				
					if (fetchRouteGetData.script_id > 0) {
						const routes = Store().getState().routes;

						routes.form.script_id = fetchRouteGetData.script_id;
						Store().dispatch({
							type: 'routes',
							payload: () => ({ ...routes }),
						});
						clearInterval(interval);
						onLoader(false);
					}
				}
			}, 3000);
			historyPush(`/${projectId}/${URL_PAGE_SERVICE}/${serviceId}/${URL_PAGE_API}/${fetchRouteData.id}`);
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
	}
	onLoader(false);
};

export default onSave;
