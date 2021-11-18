import Store from 'components/Store';

const onUnmount = (columnId) => {
	const db = Store().getState().db;

	if (db.tempValue[columnId]) {
		db.tempValue[columnId].name
			? delete db.tempValue[columnId].tempValue
			: delete db.tempValue[columnId];
	}
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onUnmount;
