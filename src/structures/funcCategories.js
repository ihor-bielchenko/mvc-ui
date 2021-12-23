
export const FUNC_CATEGORY_IF = {
	id: 1,
	text: () => 'Сравнение данных',
	subtext: () => 'Основные действия для проверки данных',
};
export const FUNC_CATEGORY_TEXT = {
	id: 2,
	text: () => 'Текстовые функции',
	subtext: () => 'Обработка, преобразование и генерация текстов',
};
export const FUNC_CATEGORY_MATH = {
	id: 3,
	text: () => 'Математика и числа',
	subtext: () => 'Работа с числами и выполнение расчетов',
};
export const FUNC_CATEGORY_ARRAY = {
	id: 4,
	text: () => 'Массивы',
	subtext: () => 'Функции для создания и управления массивами',
};
export const FUNC_CATEGORY_OBJECT = {
	id: 5,
	text: () => 'Объекты',
	subtext: () => 'Функции для создания и управлния объектами',
};
export const FUNC_CATEGORY_DB = {
	id: 6,
	text: () => 'База данных',
	subtext: () => 'Работа с базой данных',
};
export const FUNC_CATEGORY_TIME = {
	id: 7,
	disabled: true,
	text: () => 'Дата и время',
	subtext: () => 'Создание и форматирование временных значений',
};
export const FUNC_CATEGORY_HASH = {
	id: 8,
	text: () => 'Шифрование и кодировка',
	subtext: () => 'Генерация паролей и работа с зашифрованными данными',
};
export const FUNC_CATEGORY_SERVER = {
	id: 9,
	disabled: true,
	text: () => 'Сервер и URL',
	subtext: () => 'Отправка запросов на другие ресурсы',
};

const funcCategories = {
	1: FUNC_CATEGORY_IF,
	2: FUNC_CATEGORY_TEXT,
	3: FUNC_CATEGORY_MATH,
	4: FUNC_CATEGORY_ARRAY,
	5: FUNC_CATEGORY_OBJECT,
	6: FUNC_CATEGORY_DB,
	7: FUNC_CATEGORY_TIME,
	8: FUNC_CATEGORY_HASH,
	9: FUNC_CATEGORY_SERVER,
};

export default funcCategories;
