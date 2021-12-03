import { FUNC_CATEGORY_TEXT } from './funcCategories.js';
import { 
	FUNC_TEMPLATE_IF_TYPE,
	FUNC_TEMPLATE_IF_NOT_NULL, 
	FUNC_TEMPLATE_IF_REG_EXP,
} from './funcIf.js';
import { 
	DATA_TYPE_TEXT, 
	DATA_TYPE_NUMBER,
	DATA_TYPE_ARRAY,
} from './dataTypes.js';

export const FUNC_TEMPLATE_TEXT_LENGTH = {
	id: process.env.FUNC_TEMPLATE_TEXT_LENGTH,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Длина текста',
	subtext: () => 'Определить количество символов в строке',
};
export const FUNC_TEMPLATE_TEXT_SPLIT = {
	id: process.env.FUNC_TEMPLATE_TEXT_SPLIT,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => 'Разделить текст по символу',
	subtext: () => 'Разделить текст на две или больше строк по определенному символу или подстроке. Если в тексте нет указанного символа, тогда значение останется неизменным',
};
export const FUNC_TEMPLATE_TEXT_JOIN = {
	id: process.env.FUNC_TEMPLATE_TEXT_JOIN,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Объединить несколько строк в один текст',
	subtext: () => 'Можно объединять по символу или слову',
};
export const FUNC_TEMPLATE_TEXT_UPPERCASE = {
	id: process.env.FUNC_TEMPLATE_TEXT_UPPERCASE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'В верхний регистр (заглавные буквы)',
	subtext: () => 'Преобразовать все символы текста в большие буквы',
};
export const FUNC_TEMPLATE_TEXT_LOWERCASE = {
	id: process.env.FUNC_TEMPLATE_TEXT_LOWERCASE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'В нижний регистр',
	subtext: () => 'Все символы текста в нижний регистр',
};
export const FUNC_TEMPLATE_TEXT_REVERSE = {
	id: process.env.FUNC_TEMPLATE_TEXT_REVERSE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Задом наперед',
	subtext: () => 'Перевернуть текст задом наперед',
};
export const FUNC_TEMPLATE_TEXT_FIND = {
	id: process.env.FUNC_TEMPLATE_TEXT_FIND,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Найти в тексте нужную строку или символ',
	subtext: () => 'Возвращает первый индекс, по которому символ может быть найден в строке или -1, если такого символа нет',
};
export const FUNC_TEMPLATE_TEXT_REPLACE = {
	id: process.env.FUNC_TEMPLATE_TEXT_REPLACE,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Заменить часть текста на другие символы',
	subtext: () => 'Найти в тексте слова и заменить их на нужное значение',
};
export const FUNC_TEMPLATE_TEXT_SUBSTR = {
	id: process.env.FUNC_TEMPLATE_TEXT_SUBSTR,
	category_id: FUNC_CATEGORY_TEXT.id,
	data_type_id: DATA_TYPE_TEXT.id,
	disabled: true,
	text: () => 'Вырезать строку',
	subtext: () => 'Удалить из текста нужную строку или предложение',
};

const funcText = {
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_IF_NOT_NULL]: FUNC_TEMPLATE_IF_NOT_NULL,
	[process.env.FUNC_TEMPLATE_IF_REG_EXP]: FUNC_TEMPLATE_IF_REG_EXP,
	[process.env.FUNC_TEMPLATE_TEXT_LENGTH]: FUNC_TEMPLATE_TEXT_LENGTH,
	[process.env.FUNC_TEMPLATE_TEXT_SPLIT]: FUNC_TEMPLATE_TEXT_SPLIT,
	[process.env.FUNC_TEMPLATE_TEXT_JOIN]: FUNC_TEMPLATE_TEXT_JOIN,
	[process.env.FUNC_TEMPLATE_TEXT_UPPERCASE]: FUNC_TEMPLATE_TEXT_UPPERCASE,
	[process.env.FUNC_TEMPLATE_TEXT_LOWERCASE]: FUNC_TEMPLATE_TEXT_LOWERCASE,
	[process.env.FUNC_TEMPLATE_TEXT_REVERSE]: FUNC_TEMPLATE_TEXT_REVERSE,
	[process.env.FUNC_TEMPLATE_TEXT_FIND]: FUNC_TEMPLATE_TEXT_FIND,
	[process.env.FUNC_TEMPLATE_TEXT_REPLACE]: FUNC_TEMPLATE_TEXT_REPLACE,
	// [process.env.FUNC_TEMPLATE_TEXT_SUBSTR]: FUNC_TEMPLATE_TEXT_SUBSTR,
};

export default funcText;
