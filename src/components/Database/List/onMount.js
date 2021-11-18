import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchDbRowMany from 'fetch/dbRowMany.js';

const onMount = async (tableId, currentPage, rowsPerPage) => {
	onLoader(true);

	try {
		const list = Store().getState().list;
		/*const fetchDbRowResponse =*/ await fetchDbRowMany(currentPage + 1, {
			limit: rowsPerPage,
			search: '',
		});
		// const fetchDbRowData = ((fetchDbRowResponse || {}).data || {}).data || [];
	
		// list.data = [ ...fetchDbRowData ];
		list.rowsPerPage = rowsPerPage;
		list.currentPage = currentPage;

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
