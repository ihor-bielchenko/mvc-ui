import Store from 'components/Store';

const onUnmount = () => {
	const {
		jsObject,
		routes,
	} = Store().getState();

	jsObject.tempValue = {};
	routes.data = [];
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	Store().dispatch({
		type: 'routes',
		payload: () => ({ ...routes }),
	});
};

export default onUnmount;
