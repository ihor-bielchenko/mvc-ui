
const regExpEmail = /[^a-zа-я0-9.@_-]+/g;
const onValidate = (e) => {
	const target = e.target;

	if (typeof target !== 'undefined') {
		target.value = target.value.replace(regExpEmail, '');
	}
};

export default onValidate;
