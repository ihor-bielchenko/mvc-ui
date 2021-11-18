import Store from 'components/Store';

const onSelectDataTypeId = (e, tableId, columnId) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		db.tempValue[columnId].tempValue.data_type_id = Number(e.target.value);
		db.tempValue[columnId].tempValue.default_value = '';
	}
	else {
		const newColumn = {
			id: columnId,
			data_type_id: Number(e.target.value),
			name: '',
			description: '',
			default_value: '',
			required: false,
		};
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

export default onSelectDataTypeId;
