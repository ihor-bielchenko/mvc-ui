
export const emailCheck = (value) => {
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return value;
	}
	throw new Error('ErrorValidationEmail');
};

export const nameCheck = (value) => {
	if (value && value.length <= 70 && typeof value === 'string') {
		return value;
	}
	throw new Error('ErrorValidationName');
};

export const passwordCheck = (value) => {
	if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) {
		return value;
	}
	throw new Error('ErrorValidationPassword');
};
