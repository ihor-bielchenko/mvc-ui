import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

export const IF_COMPARE = {
	id: process.env.IF_COMPARE,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Сравнить два значения',
	subtext: () => 'Больше, меньше или равно',
	selectEntities: {
		1: (value) => {},
		3: (value) => {},
	},
};

export const IF_TYPE = {
	id: process.env.IF_TYPE,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Тип значения',
	subtext: () => 'Является ли значение текстом, числом, файлом и т.д.',
	selectEntities: {
		2: (value) => {},
	},
};

export const IF_PARITY = {
	id: process.env.IF_PARITY,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Четность числа',
	subtext: () => 'Является ли значение четным или нет',
	selectEntities: {
		1: (value) => {},
	},
};

export const IF_INTEGER = {
	id: process.env.IF_INTEGER,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Определить, что число целое',
	subtext: () => 'Является ли значение целым или дробным',
	selectEntities: {
		1: (value) => {},
	},
};

export const IF_NOT_NULL = {
	id: process.env.IF_NOT_NULL,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Значение не пустое',
	subtext: () => 'Проверить, что значение состоит из каких-то данных',
	selectEntities: {
		1: (value) => {},
	},
};

export const IF_REG_EXP = {
	id: process.env.IF_REG_EXP,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	disabled: false,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Регулярное выражение',
	subtext: () => 'Соответствует ли значение указанному шаблону',
	selectEntities: {
		1: (value) => {},
		2: (value) => {},
	},
};

const funcIf = {
	[process.env.IF_COMPARE]: IF_COMPARE,
	[process.env.IF_TYPE]: IF_TYPE,
	[process.env.IF_PARITY]: IF_PARITY,
	[process.env.IF_INTEGER]: IF_INTEGER,
	[process.env.IF_NOT_NULL]: IF_NOT_NULL,
	[process.env.IF_REG_EXP]: IF_REG_EXP,
};

export default funcIf;
