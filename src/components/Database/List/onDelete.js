import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import onClose from 'components/Dialog/onClose.js';
import fetchDbRowDelete from 'fetch/dbRowDelete.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onMount from './onMount.js';

const onDelete = async (e, tableId, rowId) => {
	onLoader(true);

	try {
		const list = Store().getState().list;

		await fetchDbRowDelete(JSON.stringify(rowId > 0
			? ([ rowId ])
			: list.select));
		list.select = [];
		await onMount(tableId, 0, 20);
		onClose(DIALOG_DELETE_CONFIRM)(e);
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
};

export default onDelete;
