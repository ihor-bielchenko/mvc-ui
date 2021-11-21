
const strOrNum = (e) => {
	const target = e.target;

	target.value = target.value.replace(/[^A-Za-z0-9-]/ig, '');
};

export default strOrNum;

