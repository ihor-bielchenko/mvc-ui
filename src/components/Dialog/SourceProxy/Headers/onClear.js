import Store from 'components/Store';

const onClear = (e, name, key) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.header[name]) {
		prop.tempValue.header[name][key] = '';
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onClear;
