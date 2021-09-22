import Store from 'components/Store';

const onChangeItem = (e, id, key = 'key') => {
	const prop = Store().getState().prop;

	if (typeof prop.body[id] !== undefined) {
		prop.body[id][key] = e.target.value;

		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onChangeItem;
