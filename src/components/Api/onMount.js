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
		list.data = [ ...fetchDbRowData.data ];
		list.total = fetchDbRowData.total;

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
	console.log('----');
	onLoader(false);
};

export default onMount;
