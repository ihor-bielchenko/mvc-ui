import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchRouteMany from 'fetch/routeMany.js';

const onMount = async () => {
	onLoader(true);

	try {
		const list = Store().getState().list;
		const fetchRouteResponse = await fetchRouteMany(list.currentPage + 1, {
			limit: list.rowsPerPage,
			...list.search.query
				? { search: list.search.query }
				: {},
		});
		const fetchRouteData = (fetchRouteResponse || {}).data || {};

		list.select = [];
		list.data = [ ...fetchRouteData.data ];
		list.total = fetchRouteData.total;

		Store().dispatch({
			type: 'list',
			payload: () => ({ ...list }),
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
	}
	onLoader(false);
};

export default onMount;
