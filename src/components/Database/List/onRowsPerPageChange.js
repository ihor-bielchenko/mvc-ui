import Store from 'components/Store';

const onRowsPerPageChange = (e) => {
	const target = e.target;
	const value = Number(target.value);
	const list = Store().getState().list;

	list.rowsPerPage = value;
	list.currentPage = 0;
	list.select = [];
	list.search.query = '';
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onRowsPerPageChange;