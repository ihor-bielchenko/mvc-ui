import Store from 'components/Store';

const onPlaceholder = (e, routeId, id) => {
	const prop = Store().getState().prop;

	if (!prop.tempValue.placeholder) {
		prop.tempValue.placeholder = {};
	}
	prop.tempValue.placeholder[id] = {
		route_url_id: routeId,
		route_placeholder_id: id,
		value: e.target.value,
	};
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onPlaceholder;
