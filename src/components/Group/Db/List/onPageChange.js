import Store from 'components/Store';

const onPageChange = (e, newPage) => {
	const db = Store().getState().db;

	db.list.current_page = Number(newPage);
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onPageChange;