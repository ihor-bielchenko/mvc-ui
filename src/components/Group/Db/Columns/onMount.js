import Store from 'components/Store';

const onMount = (e, tableId) => {
	const db = Store().getState().db;

	db.tempValue = { ...db.columns };
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onMount;
