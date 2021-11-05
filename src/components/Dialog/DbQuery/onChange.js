import Store from 'components/Store';

const onChange = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (!jsObject.tempValue['query']) {
		jsObject.tempValue['query'] = {};
	}
	if (!jsObject.tempValue['query'][id]) {
		jsObject.tempValue['query'][id] = {
			id,
			value: '',
			left: false,
			right: false,
		};
	}
	jsObject.tempValue.query[id].value = e.target.value;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onChange;
