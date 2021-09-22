import Store from 'components/Store';

const onDeleteLogic = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.body[name]) {
		prop.body[name].value = '';
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onDeleteLogic;
