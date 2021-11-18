import Store from 'components/Store';

const onDelete = (e, name) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.header[name]) {
		delete jsObject.tempValue.header[name];
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onDelete;
