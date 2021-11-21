import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchRouteOne from 'fetch/routeOne.js';
import getControllerId from './getControllerId.js';

const onMount = async () => {
	onLoader(true);

	try {
		const controllerId = getControllerId();

		if (controllerId > 0) {
			const routes = Store().getState().routes;
			const fetchRouteResponse = await fetchRouteOne(controllerId);
			const fetchRouteData = ((fetchRouteResponse || {}).data || {}).data || {};

			routes.form = { ...fetchRouteData };
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
	onLoader(false);
};

export default onMount;
