import Store from 'components/Store';

let onService = async (e) => {
	const jsObject = Store().getState().jsObject;
	const value = Number(e.target.value);

	if (value > 0) {
		jsObject.tempValue['service_id'] = value;
		jsObject.tempValue['route_id'] = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onService;
