import Store from 'components/Store';

const onClearOffset = (e) => {
	const prop = Store().getState().prop;

	prop.tempValue['offset'] = '';
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onClearOffset;
