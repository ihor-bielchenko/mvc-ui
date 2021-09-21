import EditIcon from '@material-ui/icons/Edit';
import StorageIcon from '@material-ui/icons/Storage';
import LinkIcon from '@material-ui/icons/Link';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SendIcon from '@material-ui/icons/Send';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import {
	COLUMN_TEXT,
	COLUMN_RICHTEXT,
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
	COLUMN_TIME,
	COLUMN_EMAIL,
	COLUMN_IP,
	COLUMN_MAC,
	COLUMN_URL,
	COLUMN_PASSWORD,
	COLUMN_FILE,
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';

export const SOURCE_MANUALLY = {
	id: process.env.SOURCE_MANUALLY,
	icon: EditIcon,
	text: () => 'Вручную',
	formatValidating: () => ([
		COLUMN_TEXT.id,
		COLUMN_RICHTEXT.id,
		COLUMN_NUMBER.id,
		COLUMN_BOOLEAN.id,
		COLUMN_TIME.id,
		COLUMN_EMAIL.id,
		COLUMN_IP.id,
		COLUMN_MAC.id,
		COLUMN_URL.id,
		COLUMN_PASSWORD.id,
		COLUMN_FILE.id,
	]),
};
export const SOURCE_DB = {
	id: process.env.SOURCE_DB,
	icon: StorageIcon,
	text: () => 'База данных',
	formatValidating: () => ([
		COLUMN_TEXT.id,
		COLUMN_RICHTEXT.id,
		COLUMN_NUMBER.id,
		COLUMN_BOOLEAN.id,
		COLUMN_TIME.id,
		COLUMN_EMAIL.id,
		COLUMN_IP.id,
		COLUMN_MAC.id,
		COLUMN_URL.id,
		COLUMN_PASSWORD.id,
		COLUMN_OBJ.id,
		COLUMN_ARR.id,
	]),
};
export const SOURCE_PROXY_PASS = {
	id: process.env.SOURCE_PROXY_PASS,
	icon: LinkIcon,
	text: () => 'Из другого сервиса',
	formatValidating: () => ([
		COLUMN_OBJ.id,
	]),
};
export const SOURCE_HEADER = {
	id: process.env.SOURCE_HEADER,
	icon: SyncAltIcon,
	text: () => 'Заголовок запроса',
	formatValidating: () => ([
		COLUMN_TEXT.id,
		COLUMN_NUMBER.id,
		COLUMN_BOOLEAN.id,
		COLUMN_TIME.id,
		COLUMN_EMAIL.id,
		COLUMN_IP.id,
		COLUMN_MAC.id,
		COLUMN_URL.id,
		COLUMN_PASSWORD.id,
	]),
};
export const SOURCE_REQUEST = {
	id: process.env.SOURCE_REQUEST,
	icon: SendIcon,
	text: () => 'Параметр запроса',
	formatValidating: () => ([
		COLUMN_TEXT.id,
		COLUMN_NUMBER.id,
		COLUMN_BOOLEAN.id,
		COLUMN_TIME.id,
		COLUMN_EMAIL.id,
		COLUMN_IP.id,
		COLUMN_MAC.id,
		COLUMN_URL.id,
		COLUMN_PASSWORD.id,
	]),
};
export const SOURCE_COOKIE = {
	id: process.env.SOURCE_COOKIE,
	icon: AssignmentIcon,
	text: () => 'Куки',
	formatValidating: () => ([
		COLUMN_TEXT.id,
		COLUMN_NUMBER.id,
		COLUMN_BOOLEAN.id,
		COLUMN_TIME.id,
		COLUMN_EMAIL.id,
		COLUMN_IP.id,
		COLUMN_MAC.id,
		COLUMN_URL.id,
		COLUMN_PASSWORD.id,
	]),
};
export const SOURCE_PLACEHOLDER = {
	id: process.env.SOURCE_PLACEHOLDER,
	icon: LinearScaleIcon,
	text: () => 'Плэйсхолдер',
	formatValidating: () => ([
		COLUMN_TEXT.id,
		COLUMN_NUMBER.id,
		COLUMN_BOOLEAN.id,
		COLUMN_TIME.id,
		COLUMN_EMAIL.id,
		COLUMN_IP.id,
		COLUMN_MAC.id,
		COLUMN_URL.id,
		COLUMN_PASSWORD.id,
	]),
};
export const SOURCE_SCRIPT = {
	id: process.env.SOURCE_SCRIPT,
	icon: AccountTreeIcon,
	text: () => 'Программа',
	disabled: true,
	formatValidating: () => ([]),
};
export const SOURCE_RAND = {
	id: process.env.SOURCE_RAND,
	icon: BubbleChartIcon,
	text: () => 'Рандом',
	disabled: true,
	formatValidating: () => ([]),
};

export const all = {
	[process.env.SOURCE_MANUALLY]: SOURCE_MANUALLY,
	[process.env.SOURCE_DB]: SOURCE_DB,
	[process.env.SOURCE_PROXY_PASS]: SOURCE_PROXY_PASS,
	[process.env.SOURCE_HEADER]: SOURCE_HEADER,
	[process.env.SOURCE_REQUEST]: SOURCE_REQUEST,
	[process.env.SOURCE_COOKIE]: SOURCE_COOKIE,
	[process.env.SOURCE_PLACEHOLDER]: SOURCE_PLACEHOLDER,
	[process.env.SOURCE_RAND]: SOURCE_RAND,
	[process.env.SOURCE_SCRIPT]: SOURCE_SCRIPT,
};

const source = {
	[process.env.SOURCE_MANUALLY]: SOURCE_MANUALLY,
	[process.env.SOURCE_DB]: SOURCE_DB,
	[process.env.SOURCE_PROXY_PASS]: SOURCE_PROXY_PASS,
	[process.env.SOURCE_HEADER]: SOURCE_HEADER,
	[process.env.SOURCE_REQUEST]: SOURCE_REQUEST,
	[process.env.SOURCE_COOKIE]: SOURCE_COOKIE,
	[process.env.SOURCE_PLACEHOLDER]: SOURCE_PLACEHOLDER,
	[process.env.SOURCE_RAND]: SOURCE_RAND,
};

export default source;
