import Store from 'components/Store';

const onAdd = () => {
	const jsObject = Store().getState().jsObject;
	const _id = Date.now();

	if (!jsObject.tempValue.header) {
		jsObject.tempValue.header = {};
	}
	jsObject.tempValue.header[_id] = {
		id: _id,
		key: '',
		value: '',
	};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onAdd;
