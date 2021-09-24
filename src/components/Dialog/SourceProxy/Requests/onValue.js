import Store from 'components/Store';

const onValue = (e, name) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.request[name]) {
		jsObject.tempValue.request[name]['value'] = e.target.value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onValue;
