import CodeIcon from '@material-ui/icons/Code';
import { COLUMN_TEXT } from 'structures/columnTypes.js';

export const HASH_PASSWORD = {
	id: process.env.HASH_PASSWORD,
	entity_id: process.env.ENTITY_FUNC,
	format_id: COLUMN_TEXT.id,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Создать пароль',
	subtext: () => 'Сгенерировать уникальный пароль с выбором сложности',
};
export const HASH_BASE64 = {
	id: process.env.HASH_BASE64,
	entity_id: process.env.ENTITY_FUNC,
	format_id: COLUMN_TEXT.id,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Простая кодировка',
	subtext: () => 'Кодировать/раскодировать данные по base64',
};
export const HASH_HASH = {
	id: process.env.HASH_HASH,
	entity_id: process.env.ENTITY_FUNC,
	format_id: COLUMN_TEXT.id,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Простое хеширование',
	subtext: () => 'Создание хеш строки с помощью алгоритма md5',
};
export const HASH_CRYPTO = {
	id: process.env.HASH_CRYPTO,
	entity_id: process.env.ENTITY_FUNC,
	format_id: COLUMN_TEXT.id,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Шифрование по ключу',
	subtext: () => 'Шифрование данных с помощью алгоритма sha256',
};
const funcHash =  {
	[process.env.HASH_PASSWORD]: HASH_PASSWORD,
	[process.env.HASH_BASE64]: HASH_BASE64,
	[process.env.HASH_HASH]: HASH_HASH,
	[process.env.HASH_CRYPTO]: HASH_CRYPTO,
};

export default funcHash;
