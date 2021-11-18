import Store from 'components/Store';

const onCheckRequired = (e, tableId, columnId) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		db.tempValue[columnId].tempValue.required = e.target.checked;
	}
	else {
		const newColumn = {
			id: columnId,
			data_type_id: Number(e.target.value),
			name: '',
			description: '',
			default_value: '',
			required: e.target.checked,
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

export default onCheckRequired;
