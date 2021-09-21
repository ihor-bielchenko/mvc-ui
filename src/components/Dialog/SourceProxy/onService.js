import Store from 'components/Store';

let onService = (e) => {
	const prop = Store().getState().prop;
	const value = Number(e.target.value);

	if (value > 0) {
		prop.tempValue['service_id'] = value;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onService;
