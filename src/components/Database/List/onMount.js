import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchDbRowMany from 'fetch/dbRowMany.js';
import { DATA_TYPE_ID } from 'structures/dataTypes.js';

const onMount = async (tableId) => {
	onLoader(true);

	try {
		const {
			list,
			db,
		} = Store().getState();
		const fetchDbRowResponse = await fetchDbRowMany({
			page: list.currentPage + 1,
			limit: list.rowsPerPage,
			...list.search.query
				? { search: list.search.query }
				: {},
			...list.sort
				? { sort: list.sort }
				: {},
			filter: JSON.stringify({ 
				table_id: tableId,
				filter_operator_id: list.filter_operator_id,
				...JSON.parse(list.filter || '{}'), 
			}),
		});
		const fetchDbRowData = (fetchDbRowResponse || {}).data || {};

		list.select = [];
		list.fetch = fetchDbRowData.data;
		list.total = fetchDbRowData.total;
		list.data = fetchDbRowData
			.data
			.map((row) => {
				const collector = {};

				Object
					.keys(row)
					.forEach((columnName) => {
						Object
							.keys(db.columns)
							.forEach((columnId) => {
								if ((db.columns[columnId].name === columnName)
									|| (columnName === 'id' 
										&& db.columns[columnId].data_type_id === DATA_TYPE_ID.id)) {
									collector[columnId] = row[columnName];
								}
							});
					});
				return collector;
			});

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
