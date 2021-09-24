import Store from 'components/Store';

const onValue = (e, name) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.header[name]) {
		jsObject.tempValue.header[name]['value'] = e.target.value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onValue;
