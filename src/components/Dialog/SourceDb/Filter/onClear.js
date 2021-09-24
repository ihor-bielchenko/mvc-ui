import Store from 'components/Store';

const onClear = (e, name, setLogicValue) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.filter &&
		jsObject.tempValue.filter[name]) {
		jsObject.tempValue.filter[name].value = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
	setLogicValue(undefined);
};

export default onClear;
