import Store from 'components/Store';

const onClear = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.query &&
		jsObject.tempValue.query[id]) {
		jsObject.tempValue.query[id].value = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onClear;
