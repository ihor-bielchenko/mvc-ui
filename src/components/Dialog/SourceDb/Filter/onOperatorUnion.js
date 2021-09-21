import Store from 'components/Store';

let onOperatorUnion = (e) => {
	const value = Number(e.target.value);
	const prop = Store().getState().prop;

	prop.tempValue['filter_operator_id'] = value;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onOperatorUnion;
