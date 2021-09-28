
const getNewItemKey = (data = [], key) => {
	const newKey = Number(key ?? data.length);
	const newKeyNumber = (((data[data.length - 1] || {}).key || '')[0] === 'n')
		? 'n+'+ newKey
		: newKey;
	const newKeyString = newKeyNumber.toString();
	const findIndex = data.findIndex((item) => item.key === newKeyString);

	if (findIndex > -1 && !Number.isNaN(newKey)) {
		return getNewItemKey(data, newKey + 1);
	}
	return newKeyString;
};

export default getNewItemKey;
