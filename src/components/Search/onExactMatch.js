import Store from 'components/Store';

const onExactMatch = (e) => {
	const target = e.target;
	const value = target.checked;
	const search = Store().getState().search;
		
	search.isExactMatch = value;
	Store().dispatch({
		type: 'search',
		payload: () => search,
	});
};

export default onExactMatch;
