
const keyStr = (e) => {
	const target = e.target;

	target.value = target.value.replace(/[^A-Za-z0-9_]/ig, '');

	if (!Number.isNaN(Number(target.value[0]))
		&& Number.isNaN(Number(target.value))) {
		target.value = target.value.replace(/^[^a-z_]+/i, '');
	}
};

export default keyStr;
