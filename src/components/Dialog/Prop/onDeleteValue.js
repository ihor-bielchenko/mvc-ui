import Store from 'components/Store';

const onDeleteValue = (id) => (e) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[id] !== 'undefined') {
		delete prop.body[id];
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onDeleteValue;
