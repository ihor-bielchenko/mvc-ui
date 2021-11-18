import Store from 'components/Store';

let onUnmount = () => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.filter
		&& jsObject.tempValue.filter[0]) {
		delete jsObject.tempValue.filter[0];
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onUnmount;
