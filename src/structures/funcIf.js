import { FUNC_CATEGORY_IF } from './funcCategories.js';
import { DATA_TYPE_BOOLEAN } from './dataTypes.js';
import { getLang } from 'components/Language';

export const FUNC_TEMPLATE_IF_COMPARE = {
	id: process.env.FUNC_TEMPLATE_IF_COMPARE,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_IF_COMPAREtext'),
	subtext: () => getLang('FUNC_TEMPLATE_IF_COMPAREsubtext'),
};
export const FUNC_TEMPLATE_IF_TYPE = {
	id: process.env.FUNC_TEMPLATE_IF_TYPE,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_IF_TYPEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_IF_TYPEsubtext'),
};
export const FUNC_TEMPLATE_IF_NOT_NULL = {
	id: process.env.FUNC_TEMPLATE_IF_NOT_NULL,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_IF_NOT_NULLtext'),
	subtext: () => getLang('FUNC_TEMPLATE_IF_NOT_NULLsubtext'),
};
export const FUNC_TEMPLATE_IF_PARITY = {
	id: process.env.FUNC_TEMPLATE_IF_PARITY,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_IF_PARITYtext'),
	subtext: () => getLang('FUNC_TEMPLATE_IF_PARITYsubtext'),
};
export const FUNC_TEMPLATE_IF_INTEGER = {
	id: process.env.FUNC_TEMPLATE_IF_INTEGER,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_IF_INTEGERtext'),
	subtext: () => getLang('FUNC_TEMPLATE_IF_INTEGERsubtext'),
};
export const FUNC_TEMPLATE_MATH_INFINITY = {
	id: process.env.FUNC_TEMPLATE_MATH_INFINITY,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_MATH_INFINITYtext'),
	subtext: () => getLang('FUNC_TEMPLATE_MATH_INFINITYsubtext'),
};
export const FUNC_TEMPLATE_MATH_NAN = {
	id: process.env.FUNC_TEMPLATE_MATH_NAN,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_MATH_NANtext'),
	subtext: () => getLang('FUNC_TEMPLATE_MATH_NANsubtext'),
};
export const FUNC_TEMPLATE_IF_REG_EXP = {
	id: process.env.FUNC_TEMPLATE_IF_REG_EXP,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => getLang('FUNC_TEMPLATE_IF_REG_EXPtext'),
	subtext: () => getLang('FUNC_TEMPLATE_IF_REG_EXPsubtext'),
};
export const funcIfArr = [
	FUNC_TEMPLATE_IF_COMPARE,
	FUNC_TEMPLATE_IF_TYPE,
	FUNC_TEMPLATE_IF_NOT_NULL,
	FUNC_TEMPLATE_IF_PARITY,
	FUNC_TEMPLATE_IF_INTEGER,
	FUNC_TEMPLATE_MATH_INFINITY,
	FUNC_TEMPLATE_MATH_NAN,
	FUNC_TEMPLATE_IF_REG_EXP,
];

const funcIf = {
	[process.env.FUNC_TEMPLATE_IF_COMPARE]: FUNC_TEMPLATE_IF_COMPARE,
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_IF_NOT_NULL]: FUNC_TEMPLATE_IF_NOT_NULL,
	[process.env.FUNC_TEMPLATE_IF_PARITY]: FUNC_TEMPLATE_IF_PARITY,
	[process.env.FUNC_TEMPLATE_IF_INTEGER]: FUNC_TEMPLATE_IF_INTEGER,
	[process.env.FUNC_TEMPLATE_MATH_INFINITY]: FUNC_TEMPLATE_MATH_INFINITY,
	[process.env.FUNC_TEMPLATE_MATH_NAN]: FUNC_TEMPLATE_MATH_NAN,
	[process.env.FUNC_TEMPLATE_IF_REG_EXP]: FUNC_TEMPLATE_IF_REG_EXP,
}

export default funcIf;
