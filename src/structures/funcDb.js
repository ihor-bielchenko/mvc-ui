import { getLang } from 'components/Language';
import { FUNC_CATEGORY_DB } from './funcCategories.js';
import { 
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER, 
} from './dataTypes.js';

export const FUNC_TEMPLATE_DB_CREATE = {
	id: process.env.FUNC_TEMPLATE_DB_CREATE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('structuresFuncDBCreate'),
	subtext: () => getLang('structuresFuncDBCreateAct'),
};
export const FUNC_TEMPLATE_DB_UPDATE = {
	id: process.env.FUNC_TEMPLATE_DB_UPDATE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncDBUpdate'),
	subtext: () => getLang('structuresFuncDBUpdateAct'),
};
export const FUNC_TEMPLATE_DB_COLUMN_CREATE = {
	id: process.env.FUNC_TEMPLATE_DB_COLUMN_CREATE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncDBCreateCol'),
	subtext: () => getLang('structuresFuncDBCreateColAct'),
};
export const FUNC_TEMPLATE_DB_COLUMN_UPDATE = {
	id: process.env.FUNC_TEMPLATE_DB_COLUMN_UPDATE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncDBUpdateCol'),
	subtext: () => getLang('structuresFuncDBUpdateColAct'),
};
export const FUNC_TEMPLATE_DB_COPY = {
	id: process.env.FUNC_TEMPLATE_DB_COPY,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	disabled: true,
	text: () => getLang('structuresFuncDBCopy'),
	subtext: () => getLang('structuresFuncDBCopyAct'),
};
export const FUNC_TEMPLATE_DB_DELETE = {
	id: process.env.FUNC_TEMPLATE_DB_DELETE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncDBRem'),
	subtext: () => getLang('structuresFuncDBRemAct'),
};
export const FUNC_TEMPLATE_DB_COLUMN_DELETE = {
	id: process.env.FUNC_TEMPLATE_DB_COLUMN_DELETE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => getLang('structuresFuncDBRemCol'),
	subtext: () => getLang('structuresFuncDBRemColAct'),
};
export const FUNC_TEMPLATE_DB_COUNT = {
	id: process.env.FUNC_TEMPLATE_DB_COUNT,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => getLang('structuresFuncDBCount'),
	subtext: () => getLang('structuresFuncDBCountAct'),
};

const funcDb = {
	[process.env.FUNC_TEMPLATE_DB_CREATE]: FUNC_TEMPLATE_DB_CREATE,
	[process.env.FUNC_TEMPLATE_DB_UPDATE]: FUNC_TEMPLATE_DB_UPDATE,
	[process.env.FUNC_TEMPLATE_DB_COPY]: FUNC_TEMPLATE_DB_COPY,
	[process.env.FUNC_TEMPLATE_DB_DELETE]: FUNC_TEMPLATE_DB_DELETE,
	[process.env.FUNC_TEMPLATE_DB_COLUMN_CREATE]: FUNC_TEMPLATE_DB_COLUMN_CREATE,
	[process.env.FUNC_TEMPLATE_DB_COLUMN_UPDATE]: FUNC_TEMPLATE_DB_COLUMN_UPDATE,
	[process.env.FUNC_TEMPLATE_DB_COLUMN_DELETE]: FUNC_TEMPLATE_DB_COLUMN_DELETE,
	[process.env.FUNC_TEMPLATE_DB_COUNT]: FUNC_TEMPLATE_DB_COUNT,
};

export default funcDb;
