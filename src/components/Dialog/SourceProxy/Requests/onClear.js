import Store from 'components/Store';

const onClear = (e, name, key) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.request[name]) {
		jsObject.tempValue.request[name][key] = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onClear;
