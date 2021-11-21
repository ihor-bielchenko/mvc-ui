import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getProjectId from 'components/Service/getProjectId.js';
import getServiceId from 'components/Service/getServiceId.js';
import axiosError from 'utils/axiosError.js';
import fetchRouteCreate from 'fetch/routeCreate.js';
import fetchRouteUpdate from 'fetch/routeUpdate.js';
import { SERVICE_TEMPLATE_BASE } from 'structures/serviceTemplates.js';
import { PROTOCOL_TYPE_HTTP } from 'structures/protocol.js';
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
				protocol_id: PROTOCOL_TYPE_HTTP.id,
				subdomain_path: routes.form.subdomain_path,
			});
		}
		else {
			const fetchRouteResponse = await fetchRouteCreate({
				project_id: getServiceId(),
				template_id: SERVICE_TEMPLATE_BASE.id,
				name: routes.form.name,
				protocol_id: PROTOCOL_TYPE_HTTP.id,
				subdomain_path: routes.form.subdomain_path,
			});
			const fetchRouteData = ((fetchRouteResponse || {}).data || {}).data || {};
			
			routes.form = { ...fetchRouteData };
			Store().dispatch({
				type: 'routes',
				payload: () => ({ ...routes }),
			});
			historyPush(`/${projectId}/${URL_PAGE_SERVICE}/${fetchRouteData.id}/${URL_PAGE_API}`);
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
