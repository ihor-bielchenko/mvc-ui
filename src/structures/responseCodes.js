import { getLang } from 'components/Language';

export const RESPONSE_CODE_200 = {
	value: '200',
	text: () => getLang('RESPONSE_CODE_200'),
};
export const RESPONSE_CODE_401 = {
	value: '401',
	text: () => getLang('RESPONSE_CODE_401'),
};
export const RESPONSE_CODE_403 = {
	value: '403',
	text: () => getLang('RESPONSE_CODE_403'),
};
export const RESPONSE_CODE_404 = {
	value: '404',
	text: () => getLang('RESPONSE_CODE_404'),
};
export const RESPONSE_CODE_500 = {
	value: '500',
	text: () => getLang('RESPONSE_CODE_500'),
};

const responseCodes = {
	200: RESPONSE_CODE_200,
	401: RESPONSE_CODE_401,
	403: RESPONSE_CODE_403,
	404: RESPONSE_CODE_404,
	500: RESPONSE_CODE_500,
};

export default responseCodes;