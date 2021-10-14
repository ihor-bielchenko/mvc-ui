import Store from 'components/Store';

const onCheckVariable = (e, newValue) => {
	const prop = Store().getState().prop;

	prop.as_variable = newValue;
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onCheckVariable;

