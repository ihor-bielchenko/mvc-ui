
const constStrTranslit = (e) => {
	const target = e.target;

	target.value = target.value.replace(/[^A-Za-zА-Яа-я0-9_ ]/ig, '');

	if (!Number.isNaN(Number(target.value[0]))
		&& Number.isNaN(Number(target.value))) {
		target.value = target.value.replace(/^[^a-zа-я_]+/i, '');
	}
};

export default constStrTranslit;
