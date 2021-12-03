import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const onChange = (e, tableId, columnId) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		db.tempValue[columnId].default_value = e.target.value;
		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
		onClose(DIALOG_DELETE_CONFIRM)(e);
	}
};

export default onChange;

