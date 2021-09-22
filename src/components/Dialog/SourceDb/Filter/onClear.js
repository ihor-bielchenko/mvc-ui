import Store from 'components/Store';

const onClear = (e, name, setLogicValue) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.filter &&
		prop.tempValue.filter[name]) {
		prop.tempValue.filter[name].value = '';
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
	setLogicValue(undefined);
};

export default onClear;
