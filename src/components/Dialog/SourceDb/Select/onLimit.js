import Store from 'components/Store';

const onLimit = (e) => {
	const prop = Store().getState().prop;

	prop.tempValue['limit'] = e.target.value
		? Number(e.target.value)
		: undefined;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onLimit;
