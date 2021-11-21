import Store from 'components/Store';

const onMethod = (e) => {
	const routes = Store().getState().routes;

	routes.form.method_id = Number(e.target.value);
	Store().dispatch({
		type: 'routes',
		payload: () => ({ ...routes }),
	});
};

export default onMethod;
