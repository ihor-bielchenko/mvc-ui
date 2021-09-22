import Store from 'components/Store';

let onAdd = (e) => {
	const prop = Store().getState().prop;

	prop.filterFormId = 0;
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onAdd;
