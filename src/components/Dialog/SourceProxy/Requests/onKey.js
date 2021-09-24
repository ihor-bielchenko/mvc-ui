import Store from 'components/Store';

const onKey = (e, name) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.request[name]) {
		jsObject.tempValue.request[name]['key'] = e.target.value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onKey;
