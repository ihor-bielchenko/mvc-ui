
export const JSON_NULL = {
	id: process.env.JSON_NULL,
	text: () => 'Null',
};
export const JSON_UNDEFINED = {
	id: process.env.JSON_UNDEFINED,
	text: () => 'Undefined',
};
export const JSON_OBJ = {
	id: process.env.JSON_OBJ,
	text: () => 'Объект',
};
export const JSON_ARR = {
	id: process.env.JSON_ARR,
	text: () => 'Массив',
};
export const JSON_TEXT = {
	id: process.env.JSON_TEXT,
	text: () => 'Текст',
};
export const JSON_NUMBER = {
	id: process.env.JSON_NUMBER,
	text: () => 'Число',
};
export const JSON_BOOLEAN = {
	id: process.env.JSON_BOOLEAN,
	disabled: true,
	text: () => 'Логическое значение',
};

const jsonFormat = {
	[process.env.JSON_NULL]: JSON_NULL,
	[process.env.JSON_UNDEFINED]: JSON_UNDEFINED,
	[process.env.JSON_OBJ]: JSON_OBJ,
	[process.env.JSON_ARR]: JSON_ARR,
	[process.env.JSON_TEXT]: JSON_TEXT,
	[process.env.JSON_NUMBER]: JSON_NUMBER,
	[process.env.JSON_BOOLEAN]: JSON_BOOLEAN,
};

export default jsonFormat;
