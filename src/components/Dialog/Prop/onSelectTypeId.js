import Store from 'components/Store';

const onSelectTypeId = (e, id) => {
	const prop = Store().getState().prop;

	if (prop.body[id]) {
		prop.body[id].type_id = Number(e.target.value);
		prop.body[id].value = '';
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onSelectTypeId;
