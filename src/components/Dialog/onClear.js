import Store from 'components/Store';

const onClear = (e, name) => {
	const prop = Store().getState().prop;

	prop.tempValue.value = '';
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onClear;
