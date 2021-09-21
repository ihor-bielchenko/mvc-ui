import Store from 'components/Store';

const onClear = (e, name, key) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.request[name]) {
		prop.tempValue.request[name][key] = '';
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onClear;
