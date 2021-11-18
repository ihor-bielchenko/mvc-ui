import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DB_ROW } from 'consts/dialog.js';

const onEdit = (e, tableId, rowIndex, rowId) => {
	const db = Store().getState().db;

	if (db.list.data[rowIndex]) {
		db.tempValue = { 
			id: rowId,
			...db.list.data[rowIndex], 
		};
		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
	}
	else {
		const columns = db.columns;
		const columnKeys = Object.keys(columns);
		const value = {};

		columnKeys.forEach((columnKey) => {
			value[columnKey] = columns[columnKey].default_value;
		});
		db.tempValue = { ...value };
	}
	onDialog(DIALOG_DB_ROW, {
		tableId,
		rowIndex,
		rowId,
	})(e);
};

export default onEdit;
