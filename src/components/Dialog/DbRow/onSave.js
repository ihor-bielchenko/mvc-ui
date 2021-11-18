import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import onMountList from 'components/Database/List/onMount.js';
import axiosError from 'utils/axiosError.js';
import fetchDbRowCreate from 'fetch/dbRowCreate.js';
import fetchDbRowUpdate from 'fetch/dbRowUpdate.js';
import { DIALOG_DB_ROW } from 'consts/dialog.js';
import onClose from '../onClose.js';

const onSave = async (e, tableId, rowId) => {
	onLoader(true);

	try {
		const db = Store().getState().db;

		(rowId > 0)
			? await fetchDbRowUpdate(rowId, {
				...db.tempValue,
			})
			: await fetchDbRowCreate({ ...db.tempValue });
		onClose(DIALOG_DB_ROW)(e);
		await onMountList(tableId, 0, 20);
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

export default onSave;
