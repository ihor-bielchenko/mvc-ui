import Store from 'components/Store';

const onColumn = (e, name, setColumnId = () => {}, setLogicValue = () => {}) => {
	const value = Number(e.target.value);
	const jsObject = Store().getState().jsObject;

	if (value >= 0) {
		if (jsObject.tempValue.filter &&
			jsObject.tempValue.filter[name]) {
			jsObject.tempValue.filter[name].value = '';

			Store().dispatch({
				type: 'jsObject',
				payload: () => ({ ...jsObject }),
			});
		}
		setColumnId(value);
		setLogicValue(undefined);
	}
};

export default onColumn;
