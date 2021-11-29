import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchRouteMany from 'fetch/routeMany.js';
import axiosError from 'utils/axiosError.js';
import { METHOD_TYPE_GET } from 'structures/method.js';

let onMount = async (serviceId) => {
	const routes = Store().getState().routes;

	if (serviceId > 0) {
		onLoader(true);

		try {
			routes.data = [];
			Store().dispatch({
				type: 'routes',
				payload: () => ({ ...routes }),
			});

			setTimeout(async () => {
				const fetchRouteResponse = await fetchRouteMany(1, {
					limit: 999,
					filter: JSON.stringify({ 
						service_id: serviceId,
						method_id: METHOD_TYPE_GET.id,
					}),
				});
				const fetchRouteData = ((fetchRouteResponse || {}).data || {}).data || [];

				routes.data = [ ...fetchRouteData ];
				Store().dispatch({
					type: 'routes',
					payload: () => ({ ...routes }),
				});
				onLoader(false);
			}, 0);
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
			onLoader(false);
		}
	}
};

export default onMount;
