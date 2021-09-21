import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CodeIcon from '@material-ui/icons/Code';

export const TEXT_TYPE = {
	id: process.env.TEXT_TYPE,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Проверить значение',
	subtext: () => 'Является ли значение текстом',
};
export const TEXT_NOT_NULL = {
	id: process.env.TEXT_NOT_NULL,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Значение не пустое',
	subtext: () => 'Проверить, что значение состоит хотя бы из одного символа',
};
export const TEXT_REG_EXP = {
	disabled: false,
	id: process.env.TEXT_REG_EXP,
	entity_id: process.env.ENTITY_CONDITION,
	format_id: process.env.FORMAT_BOOL,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Регулярное выражение',
	subtext: () => 'Соответствует ли текст указанному шаблону',
};
export const TEXT_LENGTH = {
	id: process.env.TEXT_LENGTH,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Длина текста',
	subtext: () => 'Определить количество символов в строке',
};
export const TEXT_SPLIT = {
	id: process.env.TEXT_SPLIT,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Разделить текст по символу',
	subtext: () => 'Разделить текст на две или больше строк по определенному символу или подстроке. Если в тексте нет указанного символа, тогда значение останется неизменным',
};
export const TEXT_JOIN = {
	id: process.env.TEXT_JOIN,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Объединить несколько строк в один текст',
	subtext: () => 'Можно объединять по символу или слову',
};
export const TEXT_UPPERCASE = {
	id: process.env.TEXT_UPPERCASE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'В верхний регистр (заглавные буквы)',
	subtext: () => 'Преобразовать все символы текста в большие буквы',
};
export const TEXT_LOWERCASE = {
	id: process.env.TEXT_LOWERCASE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'В нижний регистр',
	subtext: () => 'Все символы текста в нижний регистр',
};
export const TEXT_REVERSE = {
	id: process.env.TEXT_REVERSE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Задом наперед',
	subtext: () => 'Перевернуть текст задом наперед',
};
export const TEXT_FIND = {
	id: process.env.TEXT_FIND,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Найти в тексте нужную строку или символ',
	subtext: () => 'Определить, что в тексте есть нужные слова или символы',
};
export const TEXT_REPLACE = {
	id: process.env.TEXT_REPLACE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Заменить часть текста на другие символы',
	subtext: () => 'Найти в тексте слова и заменить их на нужное значение',
};
export const TEXT_SUBSTR = {
	disabled: true,
	id: process.env.TEXT_SUBSTR,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Вырезать строку',
	subtext: () => 'Удалить из текста нужную строку или предложение',
};

const funcText = {
	[process.env.TEXT_TYPE]: TEXT_TYPE,
	[process.env.TEXT_NOT_NULL]: TEXT_NOT_NULL,
	[process.env.TEXT_REG_EXP]: TEXT_REG_EXP,
	[process.env.TEXT_LENGTH]: TEXT_LENGTH,
	[process.env.TEXT_SPLIT]: TEXT_SPLIT,
	[process.env.TEXT_JOIN]: TEXT_JOIN,
	[process.env.TEXT_UPPERCASE]: TEXT_UPPERCASE,
	[process.env.TEXT_LOWERCASE]: TEXT_LOWERCASE,
	[process.env.TEXT_REVERSE]: TEXT_REVERSE,
	[process.env.TEXT_FIND]: TEXT_FIND,
	[process.env.TEXT_REPLACE]: TEXT_REPLACE,
	// [process.env.TEXT_SUBSTR]: TEXT_SUBSTR,
};

export default funcText;
