import { getLang } from 'components/Language';
import { FUNC_CATEGORY_OBJECT } from './funcCategories.js';
import { FUNC_TEMPLATE_IF_TYPE } from './funcIf.js';
import { 
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER, 
	DATA_TYPE_ARRAY,
} from './dataTypes.js';

export const FUNC_TEMPLATE_OBJ_GET = {
	id: process.env.FUNC_TEMPLATE_OBJ_GET,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: -1,
	text: () => getLang('structuresFuncObjGet'),
	subtext: () => getLang('structuresFuncObjGetSub'),
};
export const FUNC_TEMPLATE_OBJ_SET = {
	id: process.env.FUNC_TEMPLATE_OBJ_SET,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncObjSet'),
	subtext: () => getLang('structuresFuncObjSetSub'),
};
export const FUNC_TEMPLATE_OBJ_DEL = {
	id: process.env.FUNC_TEMPLATE_OBJ_DEL,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncObjDel'),
	subtext: () => getLang('structuresFuncObjDelSub'),
};
export const FUNC_TEMPLATE_OBJ_LENGTH = {
	id: process.env.FUNC_TEMPLATE_OBJ_LENGTH,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('structuresFuncObjLen'),
	subtext: () => getLang('structuresFuncObjLenSub'),
};
export const FUNC_TEMPLATE_OBJ_FOR_EACH = {
	id: process.env.FUNC_TEMPLATE_OBJ_FOR_EACH,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	disabled: true,
	text: () => getLang('structuresFuncObjEach'),
	subtext: () => getLang('structuresFuncObjEachSub'),
};
export const FUNC_TEMPLATE_OBJ_KEYS = {
	id: process.env.FUNC_TEMPLATE_OBJ_KEYS,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('structuresFuncObjKeys'),
	subtext: () => getLang('structuresFuncObjKeysSub'),
};
export const FUNC_TEMPLATE_OBJ_TO_ARR = {
	id: process.env.FUNC_TEMPLATE_OBJ_TO_ARR,
	category_id: FUNC_CATEGORY_OBJECT.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('structuresFuncObjArr'),
	subtext: () => getLang('structuresFuncObjArrSub'),
};

const funcObj = {
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_OBJ_GET]: FUNC_TEMPLATE_OBJ_GET,
	[process.env.FUNC_TEMPLATE_OBJ_SET]: FUNC_TEMPLATE_OBJ_SET,
	[process.env.FUNC_TEMPLATE_OBJ_DEL]: FUNC_TEMPLATE_OBJ_DEL,
	[process.env.FUNC_TEMPLATE_OBJ_LENGTH]: FUNC_TEMPLATE_OBJ_LENGTH,
	[process.env.FUNC_TEMPLATE_OBJ_FOR_EACH]: FUNC_TEMPLATE_OBJ_FOR_EACH,
	[process.env.FUNC_TEMPLATE_OBJ_KEYS]: FUNC_TEMPLATE_OBJ_KEYS,
	[process.env.FUNC_TEMPLATE_OBJ_TO_ARR]: FUNC_TEMPLATE_OBJ_TO_ARR,
};

export default funcObj;
