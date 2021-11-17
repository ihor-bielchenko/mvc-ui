import Store from 'components/Store';

const onStop = (e, options, id) => {
	const db = Store().getState().db;
	const tables = db.tables;

	if (tables[id]) {
		tables[id].x = options.x;
		tables[id].y = options.y;

		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
	}
};

export default onStop;
