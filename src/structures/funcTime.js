import { getLang } from 'components/Language';
import { FUNC_CATEGORY_TIME } from './funcCategories.js';
import { DATA_TYPE_TEXT } from './dataTypes.js';

export const FUNC_TEMPLATE_TIME_FORMAT = {
	id: process.env.FUNC_TEMPLATE_TIME_FORMAT,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTimeFormat'),
	subtext: () => getLang('structuresTimeFormatSub'),
};
export const FUNC_TEMPLATE_TIME_UPDATE = {
	id: process.env.FUNC_TEMPLATE_TIME_UPDATE,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTimeUpdate'),
	subtext: () => getLang('structuresTimeUpdateSub'),
};
export const FUNC_TEMPLATE_TIME_ZONE = {
	id: process.env.FUNC_TEMPLATE_TIME_ZONE,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTimeZone'),
	subtext: () => getLang('structuresTimeZoneSub'),
};

const funcTime = {
	[process.env.FUNC_TEMPLATE_TIME_FORMAT]: FUNC_TEMPLATE_TIME_FORMAT,
	[process.env.FUNC_TEMPLATE_TIME_UPDATE]: FUNC_TEMPLATE_TIME_UPDATE,
	[process.env.FUNC_TEMPLATE_TIME_ZONE]: FUNC_TEMPLATE_TIME_ZONE,
};

export default funcTime;
