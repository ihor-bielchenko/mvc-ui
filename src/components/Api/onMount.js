import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchRouteMany from 'fetch/routeMany.js';

const onMount = async () => {
	onLoader(true);

	try {
		const list = Store().getState().list;
		const fetchDbRowResponse = await fetchRouteMany(list.currentPage + 1, {
			limit: list.rowsPerPage,
			...list.search.query
				? { search: list.search.query }
				: {},
		});
		const fetchDbRowData = (fetchDbRowResponse || {}).data || {};

		list.select = [];
		// list.data = [ ...fetchDbRowData.data ];
		// list.total = fetchDbRowData.total;

		list.data = [{
			id: 1,
			name: 'route1',
			service_id: 1,
			script_id: 1,
			method_id: 1,
			protocol_id: 1,
		}];
		list.total = 1;

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
