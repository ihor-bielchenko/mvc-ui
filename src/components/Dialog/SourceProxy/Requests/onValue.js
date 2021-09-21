import Store from 'components/Store';

const onValue = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.request[name]) {
		prop.tempValue.request[name]['value'] = e.target.value;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onValue;
