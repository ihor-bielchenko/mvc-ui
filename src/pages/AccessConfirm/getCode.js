
const getCode = () => {
	const search = window.location.search;
	const split = search.split('&');
	let code = '';

	if (split.length > 0) {
		const index = split.findIndex((item) => item.indexOf('code=') > -1);
		index >= 0 && (code = split[index].replace('code=', ''));
	}

	return code;
};

export default getCode;
