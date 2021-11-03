import { FUNC_CATEGORY_IF } from './funcCategories.js';
import { DATA_TYPE_BOOLEAN } from './dataTypes.js';

export const FUNC_TEMPLATE_IF_COMPARE = {
	id: process.env.FUNC_TEMPLATE_IF_COMPARE,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Сравнить два значения',
	subtext: () => 'Больше, меньше или равно',
};
export const FUNC_TEMPLATE_IF_TYPE = {
	id: process.env.FUNC_TEMPLATE_IF_TYPE,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Тип значения',
	subtext: () => 'Проверить тип значения (строка, число, файл и т.д.)',
};
export const FUNC_TEMPLATE_IF_NOT_NULL = {
	id: process.env.FUNC_TEMPLATE_IF_NOT_NULL,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Значение не пустое',
	subtext: () => 'Проверить, что значение состоит из каких-то данных',
};
export const FUNC_TEMPLATE_IF_PARITY = {
	id: process.env.FUNC_TEMPLATE_IF_PARITY,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Четность числа',
	subtext: () => 'Является ли значение четным или нет',
};
export const FUNC_TEMPLATE_IF_INTEGER = {
	id: process.env.FUNC_TEMPLATE_IF_INTEGER,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Определить, что число целое',
	subtext: () => 'Является ли значение целым или дробным',
};
export const FUNC_TEMPLATE_MATH_INFINITY = {
	id: process.env.FUNC_TEMPLATE_MATH_INFINITY,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Бесконечность',
	subtext: () => 'В результате деления числа на 0 или если результат вычислений, не попадает в допустимый диапазон чисел JavaScript',
};
export const FUNC_TEMPLATE_MATH_NAN = {
	id: process.env.FUNC_TEMPLATE_MATH_NAN,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Не числовое значение (NaN)',
	subtext: () => 'Используется для обозначения математической ошибки, которая возникает в том случае, если математическая операция не может быть совершена',
};

export const FUNC_TEMPLATE_IF_REG_EXP = {
	id: process.env.FUNC_TEMPLATE_IF_REG_EXP,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	color: 'secondary',
	text: () => 'Регулярное выражение',
	subtext: () => 'Соответствует ли значение указанному шаблону',
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
