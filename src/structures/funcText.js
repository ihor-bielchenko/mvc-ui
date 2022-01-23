import { getLang } from 'components/Language';
import { FUNC_CATEGORY_TEXT } from './funcCategories.js';
import { 
	FUNC_TEMPLATE_IF_TYPE,
	FUNC_TEMPLATE_IF_NOT_NULL, 
	FUNC_TEMPLATE_IF_REG_EXP,
} from './funcIf.js';
import { 
	DATA_TYPE_TEXT, 
	DATA_TYPE_NUMBER,
	DATA_TYPE_ARRAY,
} from './dataTypes.js';

export const FUNC_TEMPLATE_TEXT_LENGTH = {
	id: process.env.FUNC_TEMPLATE_TEXT_LENGTH,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('structuresTextLen'),
	subtext: () => getLang('structuresTextLenSub'),
};
export const FUNC_TEMPLATE_TEXT_SPLIT = {
	id: process.env.FUNC_TEMPLATE_TEXT_SPLIT,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => getLang('structuresTextSplit'),
	subtext: () => getLang('structuresTextSplitSub'),
};
export const FUNC_TEMPLATE_TEXT_JOIN = {
	id: process.env.FUNC_TEMPLATE_TEXT_JOIN,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTextJoin'),
	subtext: () => getLang('structuresTextJoinSub'),
};
export const FUNC_TEMPLATE_TEXT_UPPERCASE = {
	id: process.env.FUNC_TEMPLATE_TEXT_UPPERCASE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTextUpp'),
	subtext: () => getLang('structuresTextUppSub'),
};
export const FUNC_TEMPLATE_TEXT_LOWERCASE = {
	id: process.env.FUNC_TEMPLATE_TEXT_LOWERCASE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTextLow'),
	subtext: () => getLang('structuresTextLowSub'),
};
export const FUNC_TEMPLATE_TEXT_REVERSE = {
	id: process.env.FUNC_TEMPLATE_TEXT_REVERSE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTextRevers'),
	subtext: () => getLang('structuresTextReversSub'),
};
export const FUNC_TEMPLATE_TEXT_FIND = {
	id: process.env.FUNC_TEMPLATE_TEXT_FIND,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTextFind'),
	subtext: () => getLang('structuresTextFindSub'),
};
export const FUNC_TEMPLATE_TEXT_REPLACE = {
	id: process.env.FUNC_TEMPLATE_TEXT_REPLACE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('structuresTextReplace'),
	subtext: () => getLang('structuresTextReplaceSub'),
};
export const FUNC_TEMPLATE_TEXT_SUBSTR = {
	id: process.env.FUNC_TEMPLATE_TEXT_SUBSTR,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	disabled: true,
	text: () => getLang('structuresTextSubstr'),
	subtext: () => getLang('structuresTextSubstrSub'),
};

const funcText = {
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_IF_NOT_NULL]: FUNC_TEMPLATE_IF_NOT_NULL,
	[process.env.FUNC_TEMPLATE_IF_REG_EXP]: FUNC_TEMPLATE_IF_REG_EXP,
	[process.env.FUNC_TEMPLATE_TEXT_LENGTH]: FUNC_TEMPLATE_TEXT_LENGTH,
	[process.env.FUNC_TEMPLATE_TEXT_SPLIT]: FUNC_TEMPLATE_TEXT_SPLIT,
	[process.env.FUNC_TEMPLATE_TEXT_JOIN]: FUNC_TEMPLATE_TEXT_JOIN,
	[process.env.FUNC_TEMPLATE_TEXT_UPPERCASE]: FUNC_TEMPLATE_TEXT_UPPERCASE,
	[process.env.FUNC_TEMPLATE_TEXT_LOWERCASE]: FUNC_TEMPLATE_TEXT_LOWERCASE,
	[process.env.FUNC_TEMPLATE_TEXT_REVERSE]: FUNC_TEMPLATE_TEXT_REVERSE,
	[process.env.FUNC_TEMPLATE_TEXT_FIND]: FUNC_TEMPLATE_TEXT_FIND,
	[process.env.FUNC_TEMPLATE_TEXT_REPLACE]: FUNC_TEMPLATE_TEXT_REPLACE,
	// [process.env.FUNC_TEMPLATE_TEXT_SUBSTR]: FUNC_TEMPLATE_TEXT_SUBSTR,
};

export default funcText;
