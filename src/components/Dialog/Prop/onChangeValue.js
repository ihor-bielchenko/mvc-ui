import Store from 'components/Store';

const onSubmit = (id) => (e) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[id] !== undefined) {
		prop.body[id] = e.target.value;

		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onSubmit;
