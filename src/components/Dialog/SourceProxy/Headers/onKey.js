import Store from 'components/Store';

const onKey = (e, name) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.header[name]) {
		jsObject.tempValue.header[name]['key'] = e.target.value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onKey;
