import Store from 'components/Store';

const onChangeName = (e) => {
	const value = e.target.value;
	const prop = Store().getState().prop;

	prop.name = value;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onChangeName;
