import Store from 'components/Store';

const onCollection = () => {
	const prop = Store().getState().prop;

	prop.tempValue['is_collection'] = !prop.tempValue['is_collection'];
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onCollection;
