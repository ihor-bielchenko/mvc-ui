import { FUNC_CATEGORY_TIME } from './funcCategories.js';
import { DATA_TYPE_TEXT } from './dataTypes.js';

export const FUNC_TEMPLATE_TIME_FORMAT = {
	id: process.env.FUNC_TEMPLATE_TIME_FORMAT,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Форматирование даты',
	subtext: () => 'Перевод времени из одного формата в другой',
};
export const FUNC_TEMPLATE_TIME_UPDATE = {
	id: process.env.FUNC_TEMPLATE_TIME_UPDATE,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Изменение значение',
	subtext: () => 'Добавить или отнять время от заданной даты',
};
export const FUNC_TEMPLATE_TIME_ZONE = {
	id: process.env.FUNC_TEMPLATE_TIME_ZONE,
	category_id: FUNC_CATEGORY_TIME.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Часовой пояс',
	subtext: () => 'Информации о временной зоне заданной даты',
};

const funcTime = {
	[process.env.FUNC_TEMPLATE_TIME_FORMAT]: FUNC_TEMPLATE_TIME_FORMAT,
	[process.env.FUNC_TEMPLATE_TIME_UPDATE]: FUNC_TEMPLATE_TIME_UPDATE,
	[process.env.FUNC_TEMPLATE_TIME_ZONE]: FUNC_TEMPLATE_TIME_ZONE,
};

export default funcTime;
