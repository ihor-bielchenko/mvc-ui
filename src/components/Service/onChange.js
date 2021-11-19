import Store from 'components/Store';

const onChange = (key) => (e) => {
	const services = Store().getState().services;

	services.form[key] = e.target.value;
	Store().dispatch({
		type: 'services',
		payload: () => ({ ...services }),
	});
};

export default onChange;
