
/**
 * @param {array} data
 * @param {undefined|number|string} key
 * undefined
 * 2
 * n
 * n+3
 * 5n+2  
 */
const generateKey = (data = [], key) => {
	let maxNOrder = '',
		nExists = false;

	data.forEach((item, index) => {
		const _nSplit = item.key.split('n');
		const _nPlusSplit = item.key.split('n+');

		if (item.key.includes('n')
			&& ((_nPlusSplit.length === 2
				&& Number(_nPlusSplit[1]) > 0
				&& (!_nPlusSplit[1] || parseInt(_nPlusSplit[1]) > 0))
			|| (_nSplit.length === 2
				&& !_nSplit[1]
				&& (!_nSplit[0] || parseInt(_nSplit[0]) > 0)))) {
			const _nOrder = Number(_nSplit[0]);

			if (_nOrder > maxNOrder) {
				maxNOrder = _nOrder;
			}
			nExists = true;
		}
	});
	if (nExists && key === 'n') {
		maxNOrder = !maxNOrder
			? 2
			: (maxNOrder + 1);
	}

	let newKey = key === 'n'
		? maxNOrder +'n'
		: !nExists
			? (key ?? data.length).toString()
			: maxNOrder +'n+'+ data.length;
	const findIndex = data.findIndex((item) => item.key === newKey);

	if (key !== 'n') {
		if (findIndex > -1) {
			return generateKey(data, data.length + 1);
		}
		else if (nExists) {
			let index = 0;

			data.forEach((item) => {
				if (item.key.includes(maxNOrder +'n')) {
					item.key = item.key === maxNOrder +'n'
						? item.key
						: maxNOrder +'n+'+ (index += 1);
				}
			});
			newKey = maxNOrder +'n+'+ (index + 1);
		}
	}
	return newKey;
};

export default generateKey;
