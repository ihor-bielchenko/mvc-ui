import Store from 'components/Store';

const onProtocol = (e) => {
	const routes = Store().getState().routes;

	routes.form.protocol_id = Number(e.target.value);
	Store().dispatch({
		type: 'routes',
		payload: () => ({ ...routes }),
	});
	console.log('routes', routes);
};

export default onProtocol;
