import Store from 'components/Store';

const onClearLimit = (e) => {
	const prop = Store().getState().prop;

	prop.tempValue['limit'] = '';
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onClearLimit;
