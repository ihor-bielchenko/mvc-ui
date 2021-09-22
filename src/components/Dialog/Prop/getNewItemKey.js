
const getNewItemKey = (body, key) => {
	const bodyIds = Object.keys(body);
	const newKey = key ?? bodyIds.length;
	const newKeyNumber = Number(newKey);
	const newKeyString = newKey.toString();
	const findIndex = bodyIds.findIndex((id) => body[id].key === newKeyString);

	if (findIndex > -1 && !Number.isNaN(newKeyNumber)) {
		return getNewItemKey(body, newKeyNumber + 1);
	}
	return newKeyString;
};

export default getNewItemKey;
