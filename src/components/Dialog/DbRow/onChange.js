import Store from 'components/Store';

const onChange = (e, columnId) => {
	const db = Store().getState().db;

	db.tempValue[columnId] = e.target.value;
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onChange;
