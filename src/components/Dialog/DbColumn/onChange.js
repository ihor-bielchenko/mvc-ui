import Store from 'components/Store';

const onChange = (e, tableId, columnId, key = 'name', setError = () => {}) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		db.tempValue[columnId].tempValue[key] = e.target.value;
	}
	else {
		const newColumn = {
			id: columnId,
			data_type_id: '',
			name: '',
			description: '',
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
	setError((currentState) => ({
		...currentState,
		name: false,
	}));
};

export default onChange;
