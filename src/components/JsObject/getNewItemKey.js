
const getNewItemKey = (data, key) => {
	const dataIds = Object.keys(data);
	const newKey = key ?? dataIds.length;
	const newKeyNumber = Number(newKey);
	const newKeyString = newKey.toString();
	const findIndex = dataIds.findIndex((id) => data[id].key === newKeyString);

	if (findIndex > -1 && !Number.isNaN(newKeyNumber)) {
		return getNewItemKey(data, newKeyNumber + 1);
	}
	return newKeyString;
};

export default getNewItemKey;
