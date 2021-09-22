import Store from 'components/Store';

const onDelete = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.header[name]) {
		delete prop.tempValue.header[name];
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onDelete;
