import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchDbRowMany from 'fetch/dbRowMany.js';

const onMount = async (tableId) => {
	onLoader(true);

	try {
		const list = Store().getState().list;
		const fetchDbRowResponse = await fetchDbRowMany(list.currentPage + 1, {
			limit: list.rowsPerPage,
			...list.search.query
				? { search: list.search.query }
				: {},
		});
		const fetchDbRowData = (fetchDbRowResponse || {}).data || {};

		list.select = [];
		list.data = fetchDbRowData
			.data
			.map((row) => {
				const collector = {};

				row.cells.forEach((cell) => {
					collector[cell.column_id] = cell.value;
				});
				return collector;
			});
		list.fetch = fetchDbRowData.data;
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
	onLoader(false);
};

export default onMount;
