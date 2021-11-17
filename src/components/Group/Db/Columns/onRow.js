import Store from 'components/Store';

const onRow = (e, id) => {
	const db = Store().getState().db;
	const tables = db.tables;

	if (tables[id]) {
		tables[id].is_collection = !tables[id].is_collection;
		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
	}
};

export default onRow;
