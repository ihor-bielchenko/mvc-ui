import Store from 'components/Store';

const onClear = (e, id, keyName = 'offset') => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue[keyName] = '';
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onClear;
