import Store from 'components/Store';

const onDeleteValue = (id) => (e) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[id] !== 'undefined') {
		delete prop.body[id];

		const bodyKeys = Object.keys(prop.body);

		console.log('bodyKeys', bodyKeys);

		if (bodyKeys.length === 1) {
			prop.body[bodyKeys[0]].key = '0';
		}

		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onDeleteValue;
