import Store from 'components/Store';

const onOffset = (e) => {
	const prop = Store().getState().prop;

	prop.tempValue['offset'] = e.target.value
		? Number(e.target.value)
		: undefined;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onOffset;
