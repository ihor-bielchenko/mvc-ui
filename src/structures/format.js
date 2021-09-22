
export const FORMAT_ATOMIC = {
	id: process.env.FORMAT_ATOMIC,
	text: () => 'Атомарное значение',
};
export const FORMAT_OBJ = {
	id: process.env.FORMAT_OBJ,
	text: () => 'Объект',
};
export const FORMAT_ARR = {
	id: process.env.FORMAT_ARR,
	text: () => 'Массив',
};

const format = {
	[process.env.FORMAT_ATOMIC]: FORMAT_ATOMIC,
	[process.env.FORMAT_OBJ]: FORMAT_OBJ,
	[process.env.FORMAT_ARR]: FORMAT_ARR,
};

export default format;