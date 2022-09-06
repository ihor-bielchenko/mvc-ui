import { getLang } from 'components/Language';

export const emailCheck = (value) => {
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return value;
	}
	throw new Error(getLang('EmailIsNotValid'));
};

export const nameCheck = (value) => {
	if (value && value.length <= 70 && typeof value === 'string') {
		return value;
	}
	throw new Error(getLang('UserNameIsNotValid'));
};

export const passwordCheck = (value) => {
	if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) {
		return value;
	}
	throw new Error(getLang('PasswordNotStrong'));
};
