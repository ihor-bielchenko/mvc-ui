import { FUNC_CATEGORY_DB } from './funcCategories.js';
import { DATA_TYPE_BOOLEAN } from './dataTypes.js';

export const FUNC_TEMPLATE_DB_CREATE = {
	id: process.env.FUNC_TEMPLATE_DB_CREATE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Создать запись',
	subtext: () => 'Добавить в базу новые данные',
};
export const FUNC_TEMPLATE_DB_COLUMN_CREATE = {
	id: process.env.FUNC_TEMPLATE_DB_COLUMN_CREATE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Добавить поле',
	subtext: () => 'Добавить в базу новую колонку',
};
export const FUNC_TEMPLATE_DB_COPY = {
	id: process.env.FUNC_TEMPLATE_DB_COPY,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Копировать',
	subtext: () => 'Копировать данные в базе',
};
export const FUNC_TEMPLATE_DB_DELETE = {
	id: process.env.FUNC_TEMPLATE_DB_DELETE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Удалить',
	subtext: () => 'Удалить данные из базы',
};
export const FUNC_TEMPLATE_DB_COLUMN_DELETE = {
	id: process.env.FUNC_TEMPLATE_DB_COLUMN_DELETE,
	category_id: FUNC_CATEGORY_DB.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Удалить поле',
	subtext: () => 'Удалить поле из базы. Все данных из этой колонки будут потеряны',
};

const funcDb = {
	[process.env.FUNC_TEMPLATE_DB_CREATE]: FUNC_TEMPLATE_DB_CREATE,
	[process.env.FUNC_TEMPLATE_DB_COPY]: FUNC_TEMPLATE_DB_COPY,
	[process.env.FUNC_TEMPLATE_DB_DELETE]: FUNC_TEMPLATE_DB_DELETE,
	[process.env.FUNC_TEMPLATE_DB_COLUMN_CREATE]: FUNC_TEMPLATE_DB_COLUMN_CREATE,
	[process.env.FUNC_TEMPLATE_DB_COLUMN_DELETE]: FUNC_TEMPLATE_DB_COLUMN_DELETE,
};

export default funcDb;
