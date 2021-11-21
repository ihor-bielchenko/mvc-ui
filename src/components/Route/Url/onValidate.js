
const onValidate = (e) => {
	const target = e.target;

	target.value = target.value.replace(/[^A-Za-z0-9-]/ig, '');
};

export default onValidate;
