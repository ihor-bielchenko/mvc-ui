import Store from 'components/Store';

const onCollection = (e) => {
	const target = e.target;
	const value = target.checked;
	const list = Store().getState().list;
		
	list.search.isCollection = value;
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onCollection;
