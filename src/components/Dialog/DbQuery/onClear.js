import Store from 'components/Store';

const onClear = (e, name, setLogicValue) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.query &&
		jsObject.tempValue.query[name]) {
		jsObject.tempValue.query[name].value = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
	setLogicValue(undefined);
};

export default onClear;
