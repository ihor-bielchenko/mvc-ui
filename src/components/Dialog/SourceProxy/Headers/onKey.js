import Store from 'components/Store';

const onKey = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.header[name]) {
		prop.tempValue.header[name]['key'] = e.target.value;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onKey;
