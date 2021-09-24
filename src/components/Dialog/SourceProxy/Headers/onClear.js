import Store from 'components/Store';

const onClear = (e, name, key) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.header[name]) {
		jsObject.tempValue.header[name][key] = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onClear;
