
export const FORMAT_STR = {
	id: process.env.FORMAT_STR,
	text: () => 'строка',
};
export const FORMAT_ARR = {
	id: process.env.FORMAT_ARR,
	text: () => 'массив',
};
export const FORMAT_NUM = {
	id: process.env.FORMAT_NUM,
	text: () => 'число',
};
export const FORMAT_BOOL = {
	id: process.env.FORMAT_BOOL,
	text: () => 'логическое',
};
export const FORMAT_NULL = {
	id: process.env.FORMAT_NULL,
	text: () => 'пустота',
};
export const FORMAT_OBJ = {
	id: process.env.FORMAT_OBJ,
	text: () => 'объект',
};

const format = {
	[process.env.FORMAT_STR]: FORMAT_STR,
	[process.env.FORMAT_NUM]: FORMAT_NUM,
	[process.env.FORMAT_BOOL]: FORMAT_BOOL,
	[process.env.FORMAT_OBJ]: FORMAT_OBJ,
	[process.env.FORMAT_ARR]: FORMAT_ARR,
	[process.env.FORMAT_NULL]: FORMAT_NULL,
};

export default format;