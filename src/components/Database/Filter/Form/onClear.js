import Store from 'components/Store';

const onClear = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.filter 
		&& jsObject.tempValue.filter[id]) {
		jsObject.tempValue.filter[id].value = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onClear;
