import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DB_ROW } from 'consts/dialog.js';

const onEdit = (e, tableId, rowIndex, rowId) => {
	const {
		db,
		list,
	} = Store().getState();
	const columns = db.columns;
	const columnKeys = Object.keys(columns);
	const value = {};

	list.search.query = '';
	columnKeys.forEach((columnKey) => {
		value[columnKey] = columns[columnKey].default_value;
	});
	db.tempValue = (list.data[rowIndex])
		? { 
			...value,
			...list.data[rowIndex], 
		}
		: { ...value };
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
	onDialog(DIALOG_DB_ROW, {
		tableId,
		rowIndex,
		rowId,
	})(e);
};

export default onEdit;
