import { FUNC_CATEGORY_HASH } from './funcCategories.js';
import { DATA_TYPE_TEXT } from './dataTypes.js';

export const FUNC_TEMPLATE_HASH_PASSWORD = {
	id: process.env.FUNC_TEMPLATE_HASH_PASSWORD,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Создать пароль',
	subtext: () => 'Сгенерировать уникальный пароль с выбором сложности',
};
export const FUNC_TEMPLATE_HASH_BASE64_ENCODE = {
	id: process.env.FUNC_TEMPLATE_HASH_BASE64_ENCODE,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Преобразовать в base64',
	subtext: () => 'Кодировать данные в base64',
};
export const FUNC_TEMPLATE_HASH_BASE64_DECODE = {
	id: process.env.FUNC_TEMPLATE_HASH_BASE64_DECODE,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Декодировать base64',
	subtext: () => 'Декодировать base64 код в исходный вид',
};
export const FUNC_TEMPLATE_HASH_HASH = {
	id: process.env.FUNC_TEMPLATE_HASH_HASH,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Простое хеширование',
	subtext: () => 'Создание хеш строки с помощью алгоритма md5',
};
export const FUNC_TEMPLATE_HASH_CRYPTO = {
	id: process.env.FUNC_TEMPLATE_HASH_CRYPTO,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => 'Шифрование по ключу',
	subtext: () => 'Шифрование данных с помощью алгоритма sha256',
};
const funcHash =  {
	[process.env.FUNC_TEMPLATE_HASH_PASSWORD]: FUNC_TEMPLATE_HASH_PASSWORD,
	[process.env.FUNC_TEMPLATE_HASH_BASE64_ENCODE]: FUNC_TEMPLATE_HASH_BASE64_ENCODE,
	[process.env.FUNC_TEMPLATE_HASH_BASE64_DECODE]: FUNC_TEMPLATE_HASH_BASE64_DECODE,
	[process.env.FUNC_TEMPLATE_HASH_HASH]: FUNC_TEMPLATE_HASH_HASH,
	[process.env.FUNC_TEMPLATE_HASH_CRYPTO]: FUNC_TEMPLATE_HASH_CRYPTO,
};

export default funcHash;
