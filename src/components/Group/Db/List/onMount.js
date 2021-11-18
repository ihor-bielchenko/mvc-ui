import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchDbRowMany from 'fetch/dbRowMany.js';

const onMount = async (tableId, currentPage, rowsPerPage) => {
	onLoader(true);

	try {
		const db = Store().getState().db;
		/*const fetchDbRowResponse =*/ await fetchDbRowMany(currentPage + 1, {
			limit: rowsPerPage,
			search: '',
		});
		// const fetchDbRowData = ((fetchDbRowResponse || {}).data || {}).data || [];
	
		// db.list.data = [ ...fetchDbRowData ];
		db.list.rowsPerPage = rowsPerPage;
		db.list.currentPage = currentPage;

		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
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
