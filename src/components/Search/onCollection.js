import Store from 'components/Store';

let timeout;
const onCollection = (e) => {
	const target = e.target;
	const value = target.checked;

	clearTimeout(timeout);
	timeout = setTimeout(() => {
		const search = Store().getState().search;
		
		search.isCollection = value;
		Store().dispatch({
			type: 'search',
			payload: () => search,
		});
	}, 0);
};

export default onCollection;
