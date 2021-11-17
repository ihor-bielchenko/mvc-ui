import Store from 'components/Store';

const onRowsPerPageChange = (e) => {
	const target = e.target;
	const value = Number(target.value);
	const db = Store().getState().db;

	db.list.rowsPerPage = value;
	Store().dispatch({
		type: 'db',
		payload: () => ({ ...db }),
	});
};

export default onRowsPerPageChange;