
const getNewItemKey = (data = [], key) => {
	const newKey = key ?? data.length;
	const newKeyNumber = Number(newKey);
	const newKeyString = newKey.toString();
	const findIndex = data.findIndex((item) => item.key === newKeyString);

	if (findIndex > -1 && !Number.isNaN(newKeyNumber)) {
		return getNewItemKey(data, newKeyNumber + 1);
	}
	return newKeyString;
};

export default getNewItemKey;
