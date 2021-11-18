import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const onDelete = (e, tableId, columnId) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		delete db.tempValue[columnId];
		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
		onClose(DIALOG_DELETE_CONFIRM)(e);
	}
};

export default onDelete;
