import Store from 'components/Store';

const onUnmount = (columnId) => {
	const db = Store().getState().db;

	db.tempValue = {};
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onUnmount;
