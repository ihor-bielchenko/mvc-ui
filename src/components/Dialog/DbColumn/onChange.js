import Store from 'components/Store';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';

const onChange = (e, tableId, columnId, key = 'name') => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		db.tempValue[columnId].tempValue[key] = e.target.value;
	}
	else {
		const newColumn = {
			id: columnId,
			data_type_id: DATA_TYPE_TEXT.id,
			name: 'column_name',
			description: 'example text',
			default_value: '',
			required: false,
		};
		newColumn[key] = e.target.value;
		db.tempValue[columnId] = {
			id: columnId,
			tempValue: { ...newColumn },
		}
	}
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onChange;
