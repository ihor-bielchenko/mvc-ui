import EditIcon from '@material-ui/icons/Edit';
import StorageIcon from '@material-ui/icons/Storage';
import LinkIcon from '@material-ui/icons/Link';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SendIcon from '@material-ui/icons/Send';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

export const SOURCE_MANUALLY = {
	id: process.env.SOURCE_MANUALLY,
	icon: EditIcon,
	text: () => 'Вручную',
};
export const SOURCE_DB = {
	id: process.env.SOURCE_DB,
	icon: StorageIcon,
	text: () => 'База данных',
};
export const SOURCE_PROXY_PASS = {
	id: process.env.SOURCE_PROXY_PASS,
	icon: LinkIcon,
	text: () => 'Из другого сервиса',
};
export const SOURCE_HEADER = {
	id: process.env.SOURCE_HEADER,
	icon: SyncAltIcon,
	text: () => 'Заголовок запроса',
};
export const SOURCE_REQUEST = {
	id: process.env.SOURCE_REQUEST,
	icon: SendIcon,
	text: () => 'Параметр запроса',
};
export const SOURCE_COOKIE = {
	id: process.env.SOURCE_COOKIE,
	icon: AssignmentIcon,
	text: () => 'Куки',
};
export const SOURCE_PLACEHOLDER = {
	id: process.env.SOURCE_PLACEHOLDER,
	icon: LinearScaleIcon,
	text: () => 'Плэйсхолдер',
};
export const SOURCE_SCRIPT = {
	id: process.env.SOURCE_SCRIPT,
	icon: AccountTreeIcon,
	text: () => 'Программа',
	disabled: true,
};
export const SOURCE_RAND = {
	id: process.env.SOURCE_RAND,
	icon: BubbleChartIcon,
	text: () => 'Рандом',
	disabled: true,
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
