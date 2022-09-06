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
import { getLang } from 'components/Language';

export const FUNC_TEMPLATE_TEXT_LENGTH = {
	id: process.env.FUNC_TEMPLATE_TEXT_LENGTH,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_LENGTHtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_LENGTHsubtext'),
};
export const FUNC_TEMPLATE_TEXT_SPLIT = {
	id: process.env.FUNC_TEMPLATE_TEXT_SPLIT,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_SPLITtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_SPLITsubtext'),
};
export const FUNC_TEMPLATE_TEXT_JOIN = {
	id: process.env.FUNC_TEMPLATE_TEXT_JOIN,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_JOINtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_JOINsubtext'),
};
export const FUNC_TEMPLATE_TEXT_UPPERCASE = {
	id: process.env.FUNC_TEMPLATE_TEXT_UPPERCASE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_UPPERCASEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_UPPERCASEsubtext'),
};
export const FUNC_TEMPLATE_TEXT_LOWERCASE = {
	id: process.env.FUNC_TEMPLATE_TEXT_LOWERCASE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_LOWERCASEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_LOWERCASEsubtext'),
};
export const FUNC_TEMPLATE_TEXT_REVERSE = {
	id: process.env.FUNC_TEMPLATE_TEXT_REVERSE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_REVERSEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_REVERSEsubtext'),
};
export const FUNC_TEMPLATE_TEXT_FIND = {
	id: process.env.FUNC_TEMPLATE_TEXT_FIND,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_FINDtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_FINDsubtext'),
};
export const FUNC_TEMPLATE_TEXT_REPLACE = {
	id: process.env.FUNC_TEMPLATE_TEXT_REPLACE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_TEXT_REPLACEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_REPLACEsubtext'),
};
export const FUNC_TEMPLATE_TEXT_SUBSTR = {
	id: process.env.FUNC_TEMPLATE_TEXT_SUBSTR,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_TEXT_SUBSTRtext'),
	subtext: () => getLang('FUNC_TEMPLATE_TEXT_SUBSTRsubtext'),
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
