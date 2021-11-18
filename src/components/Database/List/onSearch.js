import Store from 'components/Store';

const onSearch = (e, tableId) => {
	e.preventDefault();

	const list = Store().getState().list;

	list.search.query = e.currentTarget.elements.query.value;
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onSearch;
