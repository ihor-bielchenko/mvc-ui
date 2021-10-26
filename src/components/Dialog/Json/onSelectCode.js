import Store from 'components/Store';

const onSelectCode = (e) => {
	const json = Store().getState().json;

	json.code = e.target.value;
	Store().dispatch({
		type: 'json',
		payload: () => ({ ...json }),
	});
};

export default onSelectCode;
