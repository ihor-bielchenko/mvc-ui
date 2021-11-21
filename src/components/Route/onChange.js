import Store from 'components/Store';

const onChange = (key) => (e) => {
	const routes = Store().getState().routes;

	routes.form[key] = e.target.value;
	Store().dispatch({
		type: 'routes',
		payload: () => ({ ...routes }),
	});
};

export default onChange;
