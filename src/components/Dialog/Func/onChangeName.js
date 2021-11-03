import Store from 'components/Store';

const onChangeName = (storeName = 'func') => (e) => {
	const value = e.target.value;
	const entity = Store().getState()[storeName];

	entity.name = value;
	Store().dispatch({
		type: storeName,
		payload: () => ({ ...entity }),
	});
};

export default onChangeName;
