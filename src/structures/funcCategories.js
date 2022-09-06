import { getLang } from 'components/Language';

export const FUNC_CATEGORY_IF = {
	id: 1,
	text: () => getLang('FUNC_CATEGORY_IFtext'),
	subtext: () => getLang('FUNC_CATEGORY_IFsubtext'),
};
export const FUNC_CATEGORY_TEXT = {
	id: 2,
	text: () => getLang('FUNC_CATEGORY_TEXTtext'),
	subtext: () => getLang('FUNC_CATEGORY_TEXTsubtext'),
};
export const FUNC_CATEGORY_MATH = {
	id: 3,
	text: () => getLang('FUNC_CATEGORY_MATHtext'),
	subtext: () => getLang('FUNC_CATEGORY_MATHsubtext'),
};
export const FUNC_CATEGORY_ARRAY = {
	id: 4,
	text: () => getLang('FUNC_CATEGORY_ARRAYtext'),
	subtext: () => getLang('FUNC_CATEGORY_ARRAYsubtext'),
};
export const FUNC_CATEGORY_OBJECT = {
	id: 5,
	text: () => getLang('FUNC_CATEGORY_OBJECTtext'),
	subtext: () => getLang('FUNC_CATEGORY_OBJECTsubtext'),
};
export const FUNC_CATEGORY_DB = {
	id: 6,
	text: () => getLang('FUNC_CATEGORY_DBtext'),
	subtext: () => getLang('FUNC_CATEGORY_DBsubtext'),
};
export const FUNC_CATEGORY_TIME = {
	id: 7,
	disabled: true,
	text: () => getLang('FUNC_CATEGORY_TIMEtext'),
	subtext: () => getLang('FUNC_CATEGORY_TIMEsubtext'),
};
export const FUNC_CATEGORY_HASH = {
	id: 8,
	text: () => getLang('FUNC_CATEGORY_HASHtext'),
	subtext: () => getLang('FUNC_CATEGORY_HASHsubtext'),
};
export const FUNC_CATEGORY_SERVER = {
	id: 9,
	disabled: true,
	text: () => getLang('FUNC_CATEGORY_SERVERtext'),
	subtext: () => getLang('FUNC_CATEGORY_SERVERsubtext'),
};

const funcCategories = {
	1: FUNC_CATEGORY_IF,
	2: FUNC_CATEGORY_TEXT,
	3: FUNC_CATEGORY_MATH,
	4: FUNC_CATEGORY_ARRAY,
	5: FUNC_CATEGORY_OBJECT,
	6: FUNC_CATEGORY_DB,
	7: FUNC_CATEGORY_TIME,
	8: FUNC_CATEGORY_HASH,
	9: FUNC_CATEGORY_SERVER,
};

export default funcCategories;
