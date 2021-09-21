import Store from 'components/Store';

let onAdd = (e) => {
	const prop = Store().getState().prop;

	prop.sortFormId = 0;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onAdd;
