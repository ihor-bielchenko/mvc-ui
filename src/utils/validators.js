
export const emailCheck = (value) => {
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
		return value;
	}
	throw new Error('Не корректный Email');
};

export const nameCheck = (value) => {
	if (value && value.length <= 70 && typeof value === 'string') {
		return value;
	}
	throw new Error('Недопустимое имя пользователя');
};

export const passwordCheck = (value) => {
	if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)) {
		return value;
	}
	throw new Error('Пароль должен содержать хотя бы одну заглавную букву, одну прописную букву и одну цифру. Длина пароля должна быть равна 8 или больше символов');
};
