import Store from 'components/Store';

const onClear = (e) => {
	const list  = Store().getState().list;

	list.filter_operator_id = process.env.OPERATOR_UNION_AND;
	list.filter = '';
	list.sort = '';
	list.rowsPerPage = 20;
	list.currentPage = 0;
	(list.search || {}).query = '';

	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onClear;
