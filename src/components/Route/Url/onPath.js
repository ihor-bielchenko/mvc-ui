import Store from 'components/Store';

const onPath = (index) => (e) => {
	const routes = Store().getState().routes;

	if ((routes.form.url[index] || {}).value) {
		routes.form.url[index].value = e.target.value;
		Store().dispatch({
			type: 'routes',
			payload: () => ({ ...routes }),
		});
		console.log('routes', routes);
	}
};

export default onPath;
