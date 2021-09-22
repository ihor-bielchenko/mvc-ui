import Store from 'components/Store';

const onAdd = () => {
	const prop = Store().getState().prop;
	const _id = Date.now();

	if (!prop.tempValue.header) {
		prop.tempValue.header = {};
	}
	prop.tempValue.header[_id] = {
		id: _id,
		key: '',
		value: '',
	};
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onAdd;
