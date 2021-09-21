import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CodeIcon from '@material-ui/icons/Code';
import StorageIcon from '@material-ui/icons/Storage';

export const FUNC_IF = {
	id: process.env.FUNC_IF,
	icon: PlaylistAddCheckIcon,
	color: 'secondary',
	text: () => 'Проверка данных',
	subtext: () => 'Разделение программы на два возможных сценария',
};
export const FUNC_DB = {
	id: process.env.FUNC_DB,
	icon: StorageIcon,
	color: 'primary',
	text: () => 'База данных',
	subtext: () => 'Работа с базой данных',
};
export const FUNC_TEXT = {
	id: process.env.FUNC_TEXT,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Действия с текстом',
	subtext: () => 'Обработка, преобразование и генерация текстов',
};
export const FUNC_MATH = {
	id: process.env.FUNC_MATH,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Математика и числа',
	subtext: () => 'Работа с числами и выполнение расчетов',
};
export const FUNC_TIME = {
	id: process.env.FUNC_TIME,
	disabled: true,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Дата и время',
	subtext: () => 'Создание и форматирование значений времени',
};
export const FUNC_HASH = {
	id: process.env.FUNC_HASH,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Шифрование и кодировка',
	subtext: () => 'Генерация паролей и работа с зашифрованными данными',
};
export const FUNC_SERVER = {
	id: process.env.FUNC_SERVER,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Сервер и URL',
	subtext: () => 'Формирование и отправка запросов',
};

const funcTypes = {
	[process.env.FUNC_IF]: FUNC_IF,
	[process.env.FUNC_DB]: FUNC_DB,
	[process.env.FUNC_TEXT]: FUNC_TEXT,
	[process.env.FUNC_MATH]: FUNC_MATH,
	[process.env.FUNC_TIME]: FUNC_TIME,
	[process.env.FUNC_HASH]: FUNC_HASH,
	[process.env.FUNC_SERVER]: FUNC_SERVER,
};

export default funcTypes;
