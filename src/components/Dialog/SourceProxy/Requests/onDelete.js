import Store from 'components/Store';

const onDelete = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.request[name]) {
		delete prop.tempValue.request[name];
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onDelete;
