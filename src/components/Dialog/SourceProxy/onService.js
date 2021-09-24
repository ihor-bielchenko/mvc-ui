import Store from 'components/Store';

let onService = (e) => {
	const jsObject = Store().getState().jsObject;
	const value = Number(e.target.value);

	if (value > 0) {
		jsObject.tempValue['service_id'] = value;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onService;
