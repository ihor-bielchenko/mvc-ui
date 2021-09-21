import Store from 'components/Store';

const onClear = (e, name, setLogicValue) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.query &&
		prop.tempValue.query[name]) {
		prop.tempValue.query[name].value = '';
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
	setLogicValue(undefined);
};

export default onClear;
