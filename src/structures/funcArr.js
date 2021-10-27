import { FUNC_CATEGORY_ARRAY } from './funcCategories.js';
import { FUNC_TEMPLATE_IF_TYPE } from './funcIf.js';
import { 
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_NUMBER, 
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT,
} from './dataTypes.js';

export const FUNC_TEMPLATE_ARR_GET = {
	id: process.env.FUNC_TEMPLATE_ARR_GET,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	text: () => 'Выбрать значение',
	subtext: () => 'Извлечь значение из массива',
};
export const FUNC_TEMPLATE_ARR_SET = {
	id: process.env.FUNC_TEMPLATE_ARR_SET,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Установить значение',
	subtext: () => 'Установить значение в массиве',
};
export const FUNC_TEMPLATE_ARR_DEL = {
	id: process.env.FUNC_TEMPLATE_ARR_DEL,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Удалить значние',
	subtext: () => 'Удалить значение из массива по ключу',
};
export const FUNC_TEMPLATE_ARR_LENGTH = {
	id: process.env.FUNC_TEMPLATE_ARR_LENGTH,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Длина массива',
	subtext: () => 'Количество элементов в массиве',
};
export const FUNC_TEMPLATE_ARR_INDEX_OF = {
	id: process.env.FUNC_TEMPLATE_ARR_INDEX_OF,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_NUMBER.id,
	text: () => 'Индекс элемнта по значению',
	subtext: () => 'Возвращает первый индекс, по которому элемент может быть найден в массиве или -1, если такого индекса нет',
};
export const FUNC_TEMPLATE_ARR_SPLICE = {
	id: process.env.FUNC_TEMPLATE_ARR_SPLICE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => 'Редактировать массив',
	subtext: () => 'Функция изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые',
};
export const FUNC_TEMPLATE_ARR_REVERSE = {
	id: process.env.FUNC_TEMPLATE_ARR_REVERSE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => 'Обернуть порядок следования элементов массива',
	subtext: () => 'Первый элемент массива становится последним, а последний — первым',
};
export const FUNC_TEMPLATE_ARR_MERGE = {
	id: process.env.FUNC_TEMPLATE_ARR_MERGE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => 'Соединить массивы',
	subtext: () => 'Сливает значения из 2х или более массивов в один',
};
export const FUNC_TEMPLATE_ARR_REDUCE = {
	id: process.env.FUNC_TEMPLATE_ARR_REDUCE,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	text: () => 'Результирующее значение массивов',
	subtext: () => 'Перебора элементов массива для вычисления одного результирующего значения',
};
export const FUNC_TEMPLATE_ARR_FOR_EACH = {
	id: process.env.FUNC_TEMPLATE_ARR_FOR_EACH,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_BOOLEAN.id,
	text: () => 'Перебрать массив',
	subtext: () => 'Цикл для перебора элементов массива',
};
export const FUNC_TEMPLATE_ARR_FILTER = {
	id: process.env.FUNC_TEMPLATE_ARR_FILTER,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => 'Фильтрция массива',
	subtext: () => 'Функция возвращает новый массив со всеми элементами, прошедшими проверку фильтрции',
};
export const FUNC_TEMPLATE_ARR_SORT = {
	id: process.env.FUNC_TEMPLATE_ARR_SORT,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_ARRAY.id,
	text: () => 'Сортировка массива',
	subtext: () => 'Функция сортирует элементы массива и возвращает отсортированный массив',
};
export const FUNC_TEMPLATE_ARR_FIND = {
	id: process.env.FUNC_TEMPLATE_ARR_FIND,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: -1,
	text: () => 'Поиск по массиву',
	subtext: () => 'Возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию поиска',
};
export const FUNC_TEMPLATE_ARR_TO_OBJ = {
	id: process.env.FUNC_TEMPLATE_ARR_TO_OBJ,
	category_id: FUNC_CATEGORY_ARRAY.id,
	data_type_id: DATA_TYPE_OBJECT.id,
	text: () => 'Преобразовать в объект',
	subtext: () => 'Преобразовать массив в объект',
};

const funcArr = {
	[process.env.FUNC_TEMPLATE_IF_TYPE]: FUNC_TEMPLATE_IF_TYPE,
	[process.env.FUNC_TEMPLATE_ARR_GET]: FUNC_TEMPLATE_ARR_GET,
	[process.env.FUNC_TEMPLATE_ARR_SET]: FUNC_TEMPLATE_ARR_SET,
	[process.env.FUNC_TEMPLATE_ARR_DEL]: FUNC_TEMPLATE_ARR_DEL,
	[process.env.FUNC_TEMPLATE_ARR_LENGTH]: FUNC_TEMPLATE_ARR_LENGTH,
	[process.env.FUNC_TEMPLATE_ARR_INDEX_OF]: FUNC_TEMPLATE_ARR_INDEX_OF,
	[process.env.FUNC_TEMPLATE_ARR_SPLICE]: FUNC_TEMPLATE_ARR_SPLICE,
	[process.env.FUNC_TEMPLATE_ARR_REVERSE]: FUNC_TEMPLATE_ARR_REVERSE,
	[process.env.FUNC_TEMPLATE_ARR_MERGE]: FUNC_TEMPLATE_ARR_MERGE,
	[process.env.FUNC_TEMPLATE_ARR_REDUCE]: FUNC_TEMPLATE_ARR_REDUCE,
	[process.env.FUNC_TEMPLATE_ARR_FOR_EACH]: FUNC_TEMPLATE_ARR_FOR_EACH,
	[process.env.FUNC_TEMPLATE_ARR_FILTER]: FUNC_TEMPLATE_ARR_FILTER,
	[process.env.FUNC_TEMPLATE_ARR_SORT]: FUNC_TEMPLATE_ARR_SORT,
	[process.env.FUNC_TEMPLATE_ARR_FIND]: FUNC_TEMPLATE_ARR_FIND,
	[process.env.FUNC_TEMPLATE_ARR_TO_OBJ]: FUNC_TEMPLATE_ARR_TO_OBJ,
};

export default funcArr;
