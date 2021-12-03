import Store from 'components/Store';

const onChange = (e, columnId) => {
	const newValue = e.target.value;

	setTimeout(() => {
		const db = Store().getState().db;

		db.tempValue[columnId] = newValue;
		Store().dispatch({
			type: 'db',
			payload: () => db,
		});
	}, 0);
};

export default onChange;
