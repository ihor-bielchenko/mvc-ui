import { FUNC_CATEGORY_TIME } from './funcCategories.js';
import { DATA_TYPE_TEXT } from './dataTypes.js';
import { getLang } from 'components/Language';

export const FUNC_TEMPLATE_TIME_FORMAT = {
	id: process.env.FUNC_TEMPLATE_TIME_FORMAT,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TIME_FORMATtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TIME_FORMATsubtext'),
};
export const FUNC_TEMPLATE_TIME_UPDATE = {
	id: process.env.FUNC_TEMPLATE_TIME_UPDATE,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TIME_UPDATEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TIME_UPDATEsubtext'),
};
export const FUNC_TEMPLATE_TIME_ZONE = {
	id: process.env.FUNC_TEMPLATE_TIME_ZONE,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TIME_ZONEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TIME_ZONEsubtext'),
};

const funcTime = {
	[process.env.FUNC_TEMPLATE_TIME_FORMAT]: FUNC_TEMPLATE_TIME_FORMAT,
	[process.env.FUNC_TEMPLATE_TIME_UPDATE]: FUNC_TEMPLATE_TIME_UPDATE,
	[process.env.FUNC_TEMPLATE_TIME_ZONE]: FUNC_TEMPLATE_TIME_ZONE,
};

export default funcTime;
