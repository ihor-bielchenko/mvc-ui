import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CodeIcon from '@material-ui/icons/Code';

export const MATH_TYPE = {
	id: process.env.MATH_TYPE,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Определить число',
	subtext: () => 'Является ли значение числом или нет',
};
export const MATH_PARITY = {
	id: process.env.MATH_PARITY,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Проверить четность числа',
	subtext: () => 'Является ли значение четным или нет',
};
export const MATH_INTEGER = {
	id: process.env.MATH_INTEGER,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Определить, что число целое',
	subtext: () => 'Является ли значение целым или дробным',
};
export const MATH_INFINITY = {
	id: process.env.MATH_INFINITY,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Бесконечность',
	subtext: () => 'Определить, является ли значение бесконечным',
};
export const MATH_COUNT = {
	id: process.env.MATH_COUNT,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Арифметика',
	subtext: () => 'Сложение, вычитание, умножение, деление, степень, корень',
};
export const MATH_ROUND = {
	id: process.env.MATH_ROUND,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Округление',
	subtext: () => 'Преобразование дробного числа до целого в большую или меньшую сторону',
};
export const MATH_MAX = {
	id: process.env.MATH_MAX,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Наибольшее значение',
	subtext: () => 'Из нескольких значений определить наибольшее число',
};
export const MATH_MIN = {
	id: process.env.MATH_MIN,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Наименьшее значение',
	subtext: () => 'Из нескольких значений определить наименьшее число',
};
export const MATH_TRIG = {
	id: process.env.MATH_TRIG,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Тригонометрия',
	subtext: () => 'Синус, косинус, тангенс, арксинус, арккосинус, арктангенс',
};
export const MATH_LOG = {
	id: process.env.MATH_LOG,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Логарифмы',
	subtext: () => 'Действия с логарифмами',
};
export const MATH_SYSTEM = {
	id: process.env.MATH_SYSTEM,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_NUM,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Системы счисления',
	subtext: () => 'Определение и перевод чисел из одной системы в другую',
};

const funcMaths = {
	[process.env.MATH_TYPE]: MATH_TYPE,
	[process.env.MATH_PARITY]: MATH_PARITY,
	[process.env.MATH_INTEGER]: MATH_INTEGER,
	[process.env.MATH_INFINITY]: MATH_INFINITY,
	[process.env.MATH_COUNT]: MATH_COUNT,
	[process.env.MATH_ROUND]: MATH_ROUND,
	[process.env.MATH_MAX]: MATH_MAX,
	[process.env.MATH_MIN]: MATH_MIN,
	[process.env.MATH_TRIG]: MATH_TRIG,
	[process.env.MATH_LOG]: MATH_LOG,
	[process.env.MATH_SYSTEM]: MATH_SYSTEM,
};

export default funcMaths;

