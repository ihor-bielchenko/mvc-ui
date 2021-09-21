import Store from 'components/Store';

const onAddValue = (e) => {
	const prop = Store().getState().prop;

	prop.body[Date.now()] = '';
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onAddValue;
