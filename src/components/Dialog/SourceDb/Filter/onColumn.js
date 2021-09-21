import Store from 'components/Store';

const onColumn = (e, name, setColumnId = () => {}, setLogicValue = () => {}) => {
	const value = Number(e.target.value);
	const prop = Store().getState().prop;

	if (value >= 0) {
		if (prop.tempValue.filter &&
			prop.tempValue.filter[name]) {
			prop.tempValue.filter[name].value = '';

			Store().dispatch({
				type: 'prop',
				payload: () => prop,
			});
		}
		setColumnId(value);
		setLogicValue(undefined);
	}
};

export default onColumn;
