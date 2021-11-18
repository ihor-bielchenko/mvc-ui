import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import onClose from 'components/Dialog/onClose.js';
import axiosError from 'utils/axiosError.js';
import fetchDbTableUpdate from 'fetch/dbTableUpdate.js';
import fetchDbColumnCreate from 'fetch/dbColumnCreate.js';
import { DIALOG_DB_TABLE } from 'consts/dialog.js';

const onSave = async (e, tableId) => {
	onLoader(true);

	try {
		const db = Store().getState().db;
		const tables = db.tables;

		if (tables[tableId]) {
			let i = 0,
				tempValueKeys = Object.keys(db.tempValue),
				collector = {};

			while (i < tempValueKeys.length) {
				if (db.tempValue[tempValueKeys[i]]
					&& db.tempValue[tempValueKeys[i]].name) {
					collector[db.tempValue[tempValueKeys[i]].id] = JSON.stringify(db.tempValue[tempValueKeys[i]]);
				}
				i++;
			}
			await fetchDbTableUpdate(tableId, {
				...tables[tableId],
			});
			await fetchDbColumnCreate(tableId, {
				...collector,
			});
			onClose(DIALOG_DB_TABLE)(e);
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
		onLoader(false);
	}
};

export default onSave;
