import Store from 'components/Store';

let onRoute = (e) => {
	const jsObject = Store().getState().jsObject;
	const value = Number(e.target.value);

	if (value > 0) {
		jsObject.tempValue['route_id'] = value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onRoute;
