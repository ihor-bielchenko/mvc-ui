import Store from 'components/Store';

const onPlaceholder = (e, routeId, id) => {
	const jsObject = Store().getState().jsObject;

	if (!jsObject.tempValue.placeholder) {
		jsObject.tempValue.placeholder = {};
	}
	jsObject.tempValue.placeholder[id] = {
		route_url_id: routeId,
		route_placeholder_id: id,
		value: e.target.value,
	};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onPlaceholder;
