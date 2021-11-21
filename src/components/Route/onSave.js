import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getProjectId from 'components/Service/getProjectId.js';
import getServiceId from 'components/Service/getServiceId.js';
import axiosError from 'utils/axiosError.js';
import fetchRouteCreate from 'fetch/routeCreate.js';
import fetchRouteUpdate from 'fetch/routeUpdate.js';
import { 
	URL_PAGE_SERVICE,
	URL_PAGE_API, 
} from 'consts/url.js';

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
			
			routes.form.id = fetchRouteData.id;
			Store().dispatch({
				type: 'routes',
				payload: () => ({ ...routes }),
			});
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
