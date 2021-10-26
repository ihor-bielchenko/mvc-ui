import Store from 'components/Store';

const onChangeName = (e) => {
	const value = e.target.value;
	const json = Store().getState().json;

	json.name = value;
	Store().dispatch({
		type: 'json',
		payload: () => ({ ...json }),
	});
};

export default onChangeName;
