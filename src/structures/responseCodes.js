
export const RESPONSE_CODE_200 = {
	value: '200',
	text: () => '200 - Запрос успешно выполнен',
};
export const RESPONSE_CODE_401 = {
	value: '401',
	text: () => '401 - Требуется авторизация',
};
export const RESPONSE_CODE_403 = {
	value: '403',
	text: () => '403 - Доступ запрещен',
};
export const RESPONSE_CODE_404 = {
	value: '404',
	text: () => '404 - Ресурс не найден',
};
export const RESPONSE_CODE_500 = {
	value: '500',
	text: () => '500 - Ошибка на сервере',
};

const responseCodes = {
	200: RESPONSE_CODE_200,
	401: RESPONSE_CODE_401,
	403: RESPONSE_CODE_403,
	404: RESPONSE_CODE_404,
	500: RESPONSE_CODE_500,
};

export default responseCodes;