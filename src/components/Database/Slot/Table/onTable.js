import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DB_FORM } from 'consts/dialog.js';

const onTable = (e, tableId) => {
	const db = Store().getState().db;

	db.tempValue = { ...db.columns };
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
	onDialog(DIALOG_DB_FORM, {
		id: tableId,
	})(e);
};

export default onTable;
