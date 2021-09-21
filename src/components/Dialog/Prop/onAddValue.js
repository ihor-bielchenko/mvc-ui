import Store from 'components/Store';

const onAddValue = (e) => {
	const prop = Store().getState().prop;
	const key = Object.keys(prop.body).length;

	prop.body[Date.now()] = {
		key,
		value: '',
	};
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onAddValue;
