import Store from 'components/Store';

let onOperatorUnion = (e) => {
	const value = Number(e.target.value);
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue['filter_operator_id'] = value;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onOperatorUnion;
