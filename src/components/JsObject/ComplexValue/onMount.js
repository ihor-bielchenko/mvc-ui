import Store from 'components/Store';
import fetchRouteOne from 'fetch/routeOne.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (routeId) => {
	const routes = Store().getState().routes;

	try {
		if (!routes['fetch']) {
			routes['fetch'] = {};
		}
		if (!routes.fetch[routeId]) {
			const fetchRouteResponse = await fetchRouteOne(routeId);
			const fetchRouteData = ((fetchRouteResponse || {}).data || {}).data || {};

			routes.fetch[routeId] = { ...fetchRouteData };
			Store().dispatch({
				type: 'routes',
				payload: () => ({ ...routes }),
			});
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
};

export default onMount;
