import Store from 'components/Store';

let onRoute = (e) => {
	const prop = Store().getState().prop;
	const value = Number(e.target.value);

	if (value > 0) {
		prop.tempValue['route_id'] = value;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onRoute;
