import Store from 'components/Store';

const onPageChange = (e, newPage) => {
	const list = Store().getState().list;

	list.currentPage = Number(newPage);
	list.select = [];
	list.search.query = '';
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onPageChange;