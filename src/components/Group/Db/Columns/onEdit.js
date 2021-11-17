import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DB_COLUMN } from 'consts/dialog.js';

const onEdit = (e, tableId, columnId) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		delete db.tempValue[columnId].tempValue;
		db.tempValue[columnId].tempValue = { ...db.tempValue[columnId] };
		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
		onDialog(DIALOG_DB_COLUMN, {
			tableId,
			columnId,
		})(e);
	}
};

export default onEdit;
