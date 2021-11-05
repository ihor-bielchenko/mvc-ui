import Store from 'components/Store';

const onCheck = (e, id, sideName = 'left') => {
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
	jsObject.tempValue.query[id][sideName] = e.target.checked;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onCheck;
