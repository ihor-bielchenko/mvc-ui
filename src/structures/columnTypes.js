import FindInPageIcon from '@material-ui/icons/FindInPage';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ExposureIcon from '@material-ui/icons/Exposure';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import MailIcon from '@material-ui/icons/Mail';
import DnsIcon from '@material-ui/icons/Dns';
import MemoryIcon from '@material-ui/icons/Memory';
import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import LockIcon from '@material-ui/icons/Lock';
// import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

export const COLUMN_ID = {
	id: process.env.COLUMN_ID,
	icon: FindInPageIcon,
	text: () => 'ID',
};
export const COLUMN_TEXT = {
	id: process.env.COLUMN_TEXT,
	icon: TextFieldsIcon,
	text: () => 'Строка',
};
export const COLUMN_RICHTEXT = {
	id: process.env.COLUMN_RICHTEXT,
	icon: TextFormatIcon,
	disabled: true,
	text: () => 'Текстовый редактор',
};
export const COLUMN_NUMBER = {
	id: process.env.COLUMN_NUMBER,
	icon: AllInclusiveIcon,
	text: () => 'Число',
};
export const COLUMN_BOOLEAN = {
	id: process.env.COLUMN_BOOLEAN,
	icon: ExposureIcon,
	disabled: true,
	text: () => 'Логическое значение',
};;
export const COLUMN_TIME = {
	id: process.env.COLUMN_TIME,
	icon: QueryBuilderIcon,
	disabled: true,
	text: () => 'Дата и время',
};
export const COLUMN_EMAIL = {
	id: process.env.COLUMN_EMAIL,
	icon: MailIcon,
	text: () => 'Email',
};
export const COLUMN_IP = {
	id: process.env.COLUMN_IP,
	icon: DnsIcon,
	disabled: true,
	text: () => 'IP адрес',
};
export const COLUMN_MAC = {
	id: process.env.COLUMN_MAC,
	icon: MemoryIcon,
	disabled: true,
	text: () => 'MAC адрес',
};
export const COLUMN_URL = {
	id: process.env.COLUMN_URL,
	icon: LinkIcon,
	disabled: true,
	text: () => 'URL (адрес сайта или сервиса)',
};
export const COLUMN_PASSWORD = {
	id: process.env.COLUMN_PASSWORD,
	icon: LockIcon,
	text: () => 'Пароль',
};
export const COLUMN_FILE = {
	id: process.env.COLUMN_FILE,
	icon: InsertDriveFileIcon,
	disabled: true,
	text: () => 'Файл',
};
export const COLUMN_OBJ = {
	id: process.env.COLUMN_OBJ,
	icon: InsertDriveFileIcon,
	text: () => 'Объект',
};
export const COLUMN_ARR = {
	id: process.env.COLUMN_ARR,
	icon: InsertDriveFileIcon,
	text: () => 'Массив',
};
export const COLUMN_NULL = {
	id: process.env.COLUMN_NULL,
	icon: InsertDriveFileIcon,
	text: () => 'Пустота (NULL)',
};

const columnTypes = {
	[process.env.COLUMN_ID]: COLUMN_ID,
	[process.env.COLUMN_TEXT]: COLUMN_TEXT,
	[process.env.COLUMN_RICHTEXT]: COLUMN_RICHTEXT,
	[process.env.COLUMN_NUMBER]: COLUMN_NUMBER,
	[process.env.COLUMN_BOOLEAN]: COLUMN_BOOLEAN,
	[process.env.COLUMN_TIME]: COLUMN_TIME,
	[process.env.COLUMN_EMAIL]: COLUMN_EMAIL,
	[process.env.COLUMN_IP]: COLUMN_IP,
	[process.env.COLUMN_MAC]: COLUMN_MAC,
	[process.env.COLUMN_URL]: COLUMN_URL,
	[process.env.COLUMN_PASSWORD]: COLUMN_PASSWORD,
	[process.env.COLUMN_FILE]: COLUMN_FILE,
	[process.env.COLUMN_OBJ]: COLUMN_OBJ,
	[process.env.COLUMN_ARR]: COLUMN_ARR,
	[process.env.COLUMN_NULL]: COLUMN_NULL,
};

export default columnTypes;
