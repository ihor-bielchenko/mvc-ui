import Store from 'components/Store';

const getNewKey = (body, key) => {
	const bodyIds = Object.keys(body);
	const newKey = key ?? bodyIds.length;
	const newKeyNumber = Number(newKey);
	const newKeyString = newKey.toString();
	const findIndex = bodyIds.findIndex((id) => body[id].key === newKeyString);

	if (findIndex > -1 && !Number.isNaN(newKeyNumber)) {
		return getNewKey(body, newKeyNumber + 1);
	}
	return newKeyString;
};
const onAddValue = (e) => {
	const prop = Store().getState().prop;
	const key = getNewKey(prop.body);

	prop.body[Date.now()] = {
		type_id: '',
		key,
		value: '',
	};
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onAddValue;
