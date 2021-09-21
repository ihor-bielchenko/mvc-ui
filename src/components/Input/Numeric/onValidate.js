
const validFirstSign = ['', '-', '.'];
const regExpNumeric = "^[+-]?\\d*\\.\\d+$|^[+-]?\\d+(\\.\\d*)?$";
const onValidate = (e) => {
	const target = e.target;

	if (typeof target !== 'undefined') {
		const value = target.value;

		if (!value.match(regExpNumeric) && !validFirstSign.indexOf(value) >= 0) {
			target.value = value.substring(0, value.length - 1);
		}
	}
};

export default onValidate;
