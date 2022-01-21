import { getLang } from 'components/Language';
import { FUNC_CATEGORY_ARRAY } from './funcCategories.js';
import { FUNC_TEMPLATE_IF_TYPE } from './funcIf.js';
import { 
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER, 
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT,
} from './dataTypes.js';

export const FUNC_TEMPLATE_ARR_GET = {
	id: process.env.FUNC_TEMPLATE_ARR_GET,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	text: () => getLang('structuresFuncArrGet'),
	subtext: () => getLang('structuresFuncArrGetSub'),
};
export const FUNC_TEMPLATE_ARR_SET = {
	id: process.env.FUNC_TEMPLATE_ARR_SET,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncArrSet'),
	subtext: () => getLang('structuresFuncArrSetSub'),
};
export const FUNC_TEMPLATE_ARR_DEL = {
	id: process.env.FUNC_TEMPLATE_ARR_DEL,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncArrDel'),
	subtext: () => getLang('structuresFuncArrDelSub'),
};
export const FUNC_TEMPLATE_ARR_LENGTH = {
	id: process.env.FUNC_TEMPLATE_ARR_LENGTH,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('structuresFuncArrLength'),
	subtext: () => getLang('structuresFuncArrLengthSub'),
};
export const FUNC_TEMPLATE_ARR_INDEX_OF = {
	id: process.env.FUNC_TEMPLATE_ARR_INDEX_OF,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('structuresFuncArrIndex'),
	subtext: () => getLang('structuresFuncArrIndexSub'),
};
export const FUNC_TEMPLATE_ARR_SPLICE = {
	id: process.env.FUNC_TEMPLATE_ARR_SPLICE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => getLang('structuresFuncArrSplice'),
	subtext: () => getLang('structuresFuncArrSpliceSub'),
};
export const FUNC_TEMPLATE_ARR_REVERSE = {
	id: process.env.FUNC_TEMPLATE_ARR_REVERSE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => getLang('structuresFuncArrReverse'),
	subtext: () => getLang('structuresFuncArrReverseSub'),
};
export const FUNC_TEMPLATE_ARR_MERGE = {
	id: process.env.FUNC_TEMPLATE_ARR_MERGE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('structuresFuncArrMerge'),
	subtext: () => getLang('structuresFuncArrMergeSub'),
};
export const FUNC_TEMPLATE_ARR_REDUCE = {
	id: process.env.FUNC_TEMPLATE_ARR_REDUCE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	disabled: true,
	text: () => getLang('structuresFuncArrReduce'),
	subtext: () => getLang('structuresFuncArrReduceSub'),
};
export const FUNC_TEMPLATE_ARR_FOR_EACH = {
	id: process.env.FUNC_TEMPLATE_ARR_FOR_EACH,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	disabled: true,
	text: () => getLang('structuresFuncArrForEach'),
	subtext: () => getLang('structuresFuncArrForEachSub'),
};
export const FUNC_TEMPLATE_ARR_FILTER = {
	id: process.env.FUNC_TEMPLATE_ARR_FILTER,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('structuresFuncArrFilter'),
	subtext: () => getLang('structuresFuncArrFilterSub'),
};
export const FUNC_TEMPLATE_ARR_SORT = {
	id: process.env.FUNC_TEMPLATE_ARR_SORT,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	disabled: true,
	text: () => getLang('structuresFuncArrSort'),
	subtext: () => getLang('structuresFuncArrSortSub'),
};
export const FUNC_TEMPLATE_ARR_FIND = {
	id: process.env.FUNC_TEMPLATE_ARR_FIND,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	disabled: true,
	text: () => getLang('structuresFuncArrFind'),
	subtext: () => getLang('structuresFuncArrFindSub'),
};
export const FUNC_TEMPLATE_ARR_TO_OBJ = {
	id: process.env.FUNC_TEMPLATE_ARR_TO_OBJ,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_OBJECT.id,
	disabled: true,
	text: () => getLang('structuresFuncArrToObj'),
	subtext: () => getLang('structuresFuncArrToObjSub'),
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
