import Store from 'components/Store';

const onAdd = () => {
	const jsObject = Store().getState().jsObject;
	const _id = Date.now();

	if (!jsObject.tempValue.request) {
		jsObject.tempValue.request = {};
	}
	jsObject.tempValue.request[_id] = {
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
