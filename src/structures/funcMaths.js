import { 
	FUNC_CATEGORY_IF,
	FUNC_CATEGORY_MATH, 
} from './funcCategories.js';
import { 
	FUNC_TEMPLATE_IF_TYPE,
	FUNC_TEMPLATE_IF_PARITY,
	FUNC_TEMPLATE_IF_INTEGER,
} from './funcIf.js';
import { 
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER, 
} from './dataTypes.js';

export const FUNC_TEMPLATE_MATH_INFINITY = {
	id: process.env.FUNC_TEMPLATE_MATH_INFINITY,
	category_id: FUNC_CATEGORY_IF.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Бесконечность',
	subtext: () => 'Определить, является ли значение бесконечным',
};
export const FUNC_TEMPLATE_MATH_COUNT = {
	id: process.env.FUNC_TEMPLATE_MATH_COUNT,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Арифметика',
	subtext: () => 'Сложение, вычитание, умножение, деление, степень, корень',
};
export const FUNC_TEMPLATE_MATH_ROUND = {
	id: process.env.FUNC_TEMPLATE_MATH_ROUND,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Округление',
	subtext: () => 'Преобразование дробного числа до целого в большую или меньшую сторону',
};
export const FUNC_TEMPLATE_MATH_MAX = {
	id: process.env.FUNC_TEMPLATE_MATH_MAX,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Наибольшее значение',
	subtext: () => 'Из нескольких значений определить наибольшее число',
};
export const FUNC_TEMPLATE_MATH_MIN = {
	id: process.env.FUNC_TEMPLATE_MATH_MIN,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Наименьшее значение',
	subtext: () => 'Из нескольких значений определить наименьшее число',
};
export const FUNC_TEMPLATE_MATH_TRIG = {
	id: process.env.FUNC_TEMPLATE_MATH_TRIG,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Тригонометрия',
	subtext: () => 'Синус, косинус, тангенс, арксинус, арккосинус, арктангенс',
};
export const FUNC_TEMPLATE_MATH_LOG = {
	id: process.env.FUNC_TEMPLATE_MATH_LOG,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Логарифмы',
	subtext: () => 'Действия с логарифмами',
};
export const FUNC_TEMPLATE_MATH_SYSTEM = {
	id: process.env.FUNC_TEMPLATE_MATH_SYSTEM,
	category_id: FUNC_CATEGORY_MATH.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Системы счисления',
	subtext: () => 'Определение и перевод чисел из одной системы в другую',
};

const funcMaths = {
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_IF_PARITY]: FUNC_TEMPLATE_IF_PARITY,
	[process.env.FUNC_TEMPLATE_IF_INTEGER]: FUNC_TEMPLATE_IF_INTEGER,
	[process.env.FUNC_TEMPLATE_MATH_INFINITY]: FUNC_TEMPLATE_MATH_INFINITY,
	[process.env.FUNC_TEMPLATE_MATH_COUNT]: FUNC_TEMPLATE_MATH_COUNT,
	[process.env.FUNC_TEMPLATE_MATH_ROUND]: FUNC_TEMPLATE_MATH_ROUND,
	[process.env.FUNC_TEMPLATE_MATH_MAX]: FUNC_TEMPLATE_MATH_MAX,
	[process.env.FUNC_TEMPLATE_MATH_MIN]: FUNC_TEMPLATE_MATH_MIN,
	[process.env.FUNC_TEMPLATE_MATH_TRIG]: FUNC_TEMPLATE_MATH_TRIG,
	[process.env.FUNC_TEMPLATE_MATH_LOG]: FUNC_TEMPLATE_MATH_LOG,
	[process.env.FUNC_TEMPLATE_MATH_SYSTEM]: FUNC_TEMPLATE_MATH_SYSTEM,
};

export default funcMaths;

