import { getLang } from 'components/Language';

export const FUNC_CATEGORY_IF = {
	id: 1,
	text: () => getLang('structuresFuncCategoriesIf'),
	subtext: () => getLang('structuresFuncCategoriesIfAct'),
};
export const FUNC_CATEGORY_TEXT = {
	id: 2,
	text: () => getLang('structuresFuncCategoriesText'),
	subtext: () => getLang('structuresFuncCategoriesTextAct'),
};
export const FUNC_CATEGORY_MATH = {
	id: 3,
	text: () => getLang('structuresFuncCategoriesMath'),
	subtext: () => getLang('structuresFuncCategoriesMathAct'),
};
export const FUNC_CATEGORY_ARRAY = {
	id: 4,
	text: () => getLang('structuresFuncCategoriesArr'),
	subtext: () => getLang('structuresFuncCategoriesArrAct'),
};
export const FUNC_CATEGORY_OBJECT = {
	id: 5,
	text: () => getLang('structuresFuncCategoriesObj'),
	subtext: () => getLang('structuresFuncCategoriesObjAct'),
};
export const FUNC_CATEGORY_DB = {
	id: 6,
	text: () => getLang('structuresFuncCategoriesDB'),
	subtext: () => getLang('structuresFuncCategoriesDBAct'),
};
export const FUNC_CATEGORY_TIME = {
	id: 7,
	disabled: true,
	text: () => getLang('structuresFuncCategoriesTime'),
	subtext: () => getLang('structuresFuncCategoriesTimeAct'),
};
export const FUNC_CATEGORY_HASH = {
	id: 8,
	text: () => getLang('structuresFuncCategoriesHash'),
	subtext: () => getLang('structuresFuncCategoriesHashAct'),
};
export const FUNC_CATEGORY_SERVER = {
	id: 9,
	disabled: true,
	text: () => getLang('structuresFuncCategoriesServer'),
	subtext: () => getLang('structuresFuncCategoriesServerAct'),
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
