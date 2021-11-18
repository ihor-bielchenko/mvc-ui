import Store from 'components/Store';

const onExactMatch = (e) => {
	const target = e.target;
	const value = target.checked;
	const list = Store().getState().list;
		
	list.search.isExactMatch = value;
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onExactMatch;
