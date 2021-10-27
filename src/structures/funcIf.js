import { FUNC_CATEGORY_IF } from './funcCategories.js';
import { DATA_TYPE_BOOLEAN } from './dataTypes.js';

export const FUNC_TEMPLATE_IF_COMPARE = {
	id: process.env.FUNC_TEMPLATE_IF_COMPARE,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Сравнить два значения',
	subtext: () => 'Больше, меньше или равно',
};

export const FUNC_TEMPLATE_IF_TYPE = {
	id: process.env.FUNC_TEMPLATE_IF_TYPE,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Тип значения',
	subtext: () => 'Проверить тип значения (строка, число, файл и т.д.)',
};

export const FUNC_TEMPLATE_IF_PARITY = {
	id: process.env.FUNC_TEMPLATE_IF_PARITY,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Четность числа',
	subtext: () => 'Является ли значение четным или нет',
};

export const FUNC_TEMPLATE_IF_INTEGER = {
	id: process.env.FUNC_TEMPLATE_IF_INTEGER,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Определить, что число целое',
	subtext: () => 'Является ли значение целым или дробным',
};

export const FUNC_TEMPLATE_IF_NOT_NULL = {
	id: process.env.FUNC_TEMPLATE_IF_NOT_NULL,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Значение не пустое',
	subtext: () => 'Проверить, что значение состоит из каких-то данных',
};

export const FUNC_TEMPLATE_IF_REG_EXP = {
	id: process.env.FUNC_TEMPLATE_IF_REG_EXP,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Регулярное выражение',
	subtext: () => 'Соответствует ли значение указанному шаблону',
};

const funcIf = {
	[process.env.FUNC_TEMPLATE_IF_COMPARE]: FUNC_TEMPLATE_IF_COMPARE,
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_IF_PARITY]: FUNC_TEMPLATE_IF_PARITY,
	[process.env.FUNC_TEMPLATE_IF_INTEGER]: FUNC_TEMPLATE_IF_INTEGER,
	[process.env.FUNC_TEMPLATE_IF_NOT_NULL]: FUNC_TEMPLATE_IF_NOT_NULL,
	[process.env.FUNC_TEMPLATE_IF_REG_EXP]: FUNC_TEMPLATE_IF_REG_EXP,
};

export default funcIf;
