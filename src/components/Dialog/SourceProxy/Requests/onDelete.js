import Store from 'components/Store';

const onDelete = (e, name) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.request[name]) {
		delete jsObject.tempValue.request[name];
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onDelete;
