import Store from 'components/Store';

const onKey = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.request[name]) {
		prop.tempValue.request[name]['key'] = e.target.value;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onKey;
