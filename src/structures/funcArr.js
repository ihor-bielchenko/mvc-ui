import { FUNC_CATEGORY_ARRAY } from './funcCategories.js';
import { FUNC_TEMPLATE_IF_TYPE } from './funcIf.js';
import { 
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER, 
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT,
} from './dataTypes.js';
import { getLang } from 'components/Language';

export const FUNC_TEMPLATE_ARR_GET = {
	id: process.env.FUNC_TEMPLATE_ARR_GET,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	text: () => getLang('FUNC_TEMPLATE_ARR_GETtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_GETsubtext'),
};
export const FUNC_TEMPLATE_ARR_SET = {
	id: process.env.FUNC_TEMPLATE_ARR_SET,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('FUNC_TEMPLATE_ARR_SETtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_SETsubtext'),
};
export const FUNC_TEMPLATE_ARR_DEL = {
	id: process.env.FUNC_TEMPLATE_ARR_DEL,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('FUNC_TEMPLATE_ARR_DELtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_DELsubtext'),
};
export const FUNC_TEMPLATE_ARR_LENGTH = {
	id: process.env.FUNC_TEMPLATE_ARR_LENGTH,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('FUNC_TEMPLATE_ARR_LENGTHtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_LENGTHsubtext'),
};
export const FUNC_TEMPLATE_ARR_INDEX_OF = {
	id: process.env.FUNC_TEMPLATE_ARR_INDEX_OF,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('FUNC_TEMPLATE_ARR_INDEX_OFtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_INDEX_OFsubtext'),
};
export const FUNC_TEMPLATE_ARR_SPLICE = {
	id: process.env.FUNC_TEMPLATE_ARR_SPLICE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => getLang('FUNC_TEMPLATE_ARR_SPLICEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_SPLICEsubtext'),
};
export const FUNC_TEMPLATE_ARR_REVERSE = {
	id: process.env.FUNC_TEMPLATE_ARR_REVERSE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => getLang('FUNC_TEMPLATE_ARR_REVERSEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_REVERSEsubtext'),
};
export const FUNC_TEMPLATE_ARR_MERGE = {
	id: process.env.FUNC_TEMPLATE_ARR_MERGE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_MERGEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_MERGEsubtext'),
};
export const FUNC_TEMPLATE_ARR_REDUCE = {
	id: process.env.FUNC_TEMPLATE_ARR_REDUCE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_REDUCEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_REDUCEsubtext'),
};
export const FUNC_TEMPLATE_ARR_FOR_EACH = {
	id: process.env.FUNC_TEMPLATE_ARR_FOR_EACH,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_FOR_EACHtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_FOR_EACHsubtext'),
};
export const FUNC_TEMPLATE_ARR_FILTER = {
	id: process.env.FUNC_TEMPLATE_ARR_FILTER,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_FILTERtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_FILTERsubtext'),
};
export const FUNC_TEMPLATE_ARR_SORT = {
	id: process.env.FUNC_TEMPLATE_ARR_SORT,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_SORTtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_SORTsubtext'),
};
export const FUNC_TEMPLATE_ARR_FIND = {
	id: process.env.FUNC_TEMPLATE_ARR_FIND,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_FINDtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_FINDsubtext'),
};
export const FUNC_TEMPLATE_ARR_TO_OBJ = {
	id: process.env.FUNC_TEMPLATE_ARR_TO_OBJ,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_OBJECT.id,
	disabled: true,
	text: () => getLang('FUNC_TEMPLATE_ARR_TO_OBJtext'),
	subtext: () => getLang('FUNC_TEMPLATE_ARR_TO_OBJsubtext'),
};

const funcArr = {
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_ARR_GET]: FUNC_TEMPLATE_ARR_GET,
	[process.env.FUNC_TEMPLATE_ARR_SET]: FUNC_TEMPLATE_ARR_SET,
	[process.env.FUNC_TEMPLATE_ARR_DEL]: FUNC_TEMPLATE_ARR_DEL,
	[process.env.FUNC_TEMPLATE_ARR_LENGTH]: FUNC_TEMPLATE_ARR_LENGTH,
	[process.env.FUNC_TEMPLATE_ARR_INDEX_OF]: FUNC_TEMPLATE_ARR_INDEX_OF,
	[process.env.FUNC_TEMPLATE_ARR_SPLICE]: FUNC_TEMPLATE_ARR_SPLICE,
	[process.env.FUNC_TEMPLATE_ARR_REVERSE]: FUNC_TEMPLATE_ARR_REVERSE,
	[process.env.FUNC_TEMPLATE_ARR_MERGE]: FUNC_TEMPLATE_ARR_MERGE,
	[process.env.FUNC_TEMPLATE_ARR_REDUCE]: FUNC_TEMPLATE_ARR_REDUCE,
	[process.env.FUNC_TEMPLATE_ARR_FOR_EACH]: FUNC_TEMPLATE_ARR_FOR_EACH,
	[process.env.FUNC_TEMPLATE_ARR_FILTER]: FUNC_TEMPLATE_ARR_FILTER,
	[process.env.FUNC_TEMPLATE_ARR_SORT]: FUNC_TEMPLATE_ARR_SORT,
	[process.env.FUNC_TEMPLATE_ARR_FIND]: FUNC_TEMPLATE_ARR_FIND,
	[process.env.FUNC_TEMPLATE_ARR_TO_OBJ]: FUNC_TEMPLATE_ARR_TO_OBJ,
};

export default funcArr;
