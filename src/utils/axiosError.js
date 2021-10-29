
const axiosError = (err) => {
	let output = 'Bad request: ';

	if (err.response) {
		if (((err.response || {}).data || {}).message) {
			output += String(err.response.data.message);
		}
		if (typeof ((err.response || {}).data || {}).errors === 'object') {
			output += Object
				.keys(err.response.data.errors)
				.map((key) => ' '+ (Array.isArray(err.response.data.errors[key]))
					? err.response.data.errors[key][0]
					: String(err.response.data.errors[key]));
		}
	}
	else if (typeof (err.response || {}).statusText === 'string') {
		output = err.response.statusText;
	}
	else {
		output = err.message;
	}

	return output;
};

export default axiosError;
