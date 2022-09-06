import React from 'react';
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
	DATA_TYPE_TEXT,
	DATA_TYPE_RICHTEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_TIME,
	DATA_TYPE_EMAIL,
	DATA_TYPE_IP,
	DATA_TYPE_MAC,
	DATA_TYPE_URL,
	DATA_TYPE_PASSWORD,
	DATA_TYPE_FILE,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { getLang } from 'components/Language';

export const SOURCE_TYPE_MANUALLY = {
	id: process.env.SOURCE_TYPE_MANUALLY,
	icon: EditIcon,
	text: () => getLang('Manually'),
	dataTypeValidating: () => ([
		DATA_TYPE_TEXT.id,
		DATA_TYPE_RICHTEXT.id,
		DATA_TYPE_NUMBER.id,
		DATA_TYPE_BOOLEAN.id,
		DATA_TYPE_TIME.id,
		DATA_TYPE_EMAIL.id,
		DATA_TYPE_IP.id,
		DATA_TYPE_MAC.id,
		DATA_TYPE_URL.id,
		DATA_TYPE_PASSWORD.id,
		DATA_TYPE_FILE.id,
	]),
};
export const SOURCE_TYPE_DB = {
	id: process.env.SOURCE_TYPE_DB,
	icon: StorageIcon,
	text: () => getLang('Databasa'),
	dataTypeValidating: () => ([
		DATA_TYPE_TEXT.id,
		DATA_TYPE_RICHTEXT.id,
		DATA_TYPE_NUMBER.id,
		DATA_TYPE_BOOLEAN.id,
		DATA_TYPE_TIME.id,
		DATA_TYPE_EMAIL.id,
		DATA_TYPE_IP.id,
		DATA_TYPE_MAC.id,
		DATA_TYPE_URL.id,
		DATA_TYPE_PASSWORD.id,
		DATA_TYPE_OBJECT.id,
		DATA_TYPE_ARRAY.id,
	]),
};
export const SOURCE_TYPE_PROXY_PASS = {
	id: process.env.SOURCE_TYPE_PROXY_PASS,
	icon: LinkIcon,
	text: () => getLang('FromAnotherServiceText'),
	dataTypeValidating: () => ([
		DATA_TYPE_OBJECT.id,
	]),
};
export const SOURCE_TYPE_HEADER = {
	id: process.env.SOURCE_TYPE_HEADER,
	icon: SyncAltIcon,
	text: () => getLang('HeaderRequest'),
	dataTypeValidating: () => ([
		DATA_TYPE_TEXT.id,
		DATA_TYPE_NUMBER.id,
		DATA_TYPE_BOOLEAN.id,
		DATA_TYPE_TIME.id,
		DATA_TYPE_EMAIL.id,
		DATA_TYPE_IP.id,
		DATA_TYPE_MAC.id,
		DATA_TYPE_URL.id,
		DATA_TYPE_PASSWORD.id,
	]),
};
export const SOURCE_TYPE_REQUEST = {
	id: process.env.SOURCE_TYPE_REQUEST,
	icon: SendIcon,
	text: () => getLang('RequestParam'),
	dataTypeValidating: () => ([
		DATA_TYPE_TEXT.id,
		DATA_TYPE_NUMBER.id,
		DATA_TYPE_BOOLEAN.id,
		DATA_TYPE_TIME.id,
		DATA_TYPE_EMAIL.id,
		DATA_TYPE_IP.id,
		DATA_TYPE_MAC.id,
		DATA_TYPE_URL.id,
		DATA_TYPE_PASSWORD.id,
	]),
};
export const SOURCE_TYPE_COOKIE = {
	id: process.env.SOURCE_TYPE_COOKIE,
	icon: AssignmentIcon,
	text: () => getLang('Cookie'),
	dataTypeValidating: () => ([
		DATA_TYPE_TEXT.id,
		DATA_TYPE_NUMBER.id,
		DATA_TYPE_BOOLEAN.id,
		DATA_TYPE_TIME.id,
		DATA_TYPE_EMAIL.id,
		DATA_TYPE_IP.id,
		DATA_TYPE_MAC.id,
		DATA_TYPE_URL.id,
		DATA_TYPE_PASSWORD.id,
	]),
};
export const SOURCE_TYPE_PLACEHOLDER = {
	id: process.env.SOURCE_TYPE_PLACEHOLDER,
	icon: LinearScaleIcon,
	text: () => getLang('SPlaceholder'),
	dataTypeValidating: () => ([
		DATA_TYPE_TEXT.id,
		DATA_TYPE_NUMBER.id,
		DATA_TYPE_BOOLEAN.id,
		DATA_TYPE_TIME.id,
		DATA_TYPE_EMAIL.id,
		DATA_TYPE_IP.id,
		DATA_TYPE_MAC.id,
		DATA_TYPE_URL.id,
		DATA_TYPE_PASSWORD.id,
	]),
};
export const SOURCE_TYPE_RAND = {
	id: process.env.SOURCE_TYPE_RAND,
	icon: BubbleChartIcon,
	text: () => getLang('Random'),
	disabled: true,
	dataTypeValidating: () => ([]),
};
export const SOURCE_TYPE_SCRIPT = {
	id: process.env.SOURCE_TYPE_SCRIPT,
	icon: AccountTreeIcon,
	disabled: true,
	text: (text = '') => <React.Fragment>
		{getLang('Programm')} {text
			? <b>- {text}</b>
			: ''}
	</React.Fragment>,
	dataTypeValidating: () => ([]),
};

export const all = {
	[process.env.SOURCE_TYPE_MANUALLY]: SOURCE_TYPE_MANUALLY,
	[process.env.SOURCE_TYPE_DB]: SOURCE_TYPE_DB,
	[process.env.SOURCE_TYPE_PROXY_PASS]: SOURCE_TYPE_PROXY_PASS,
	[process.env.SOURCE_TYPE_HEADER]: SOURCE_TYPE_HEADER,
	[process.env.SOURCE_TYPE_REQUEST]: SOURCE_TYPE_REQUEST,
	[process.env.SOURCE_TYPE_COOKIE]: SOURCE_TYPE_COOKIE,
	[process.env.SOURCE_TYPE_PLACEHOLDER]: SOURCE_TYPE_PLACEHOLDER,
	[process.env.SOURCE_TYPE_RAND]: SOURCE_TYPE_RAND,
	[process.env.SOURCE_TYPE_SCRIPT]: SOURCE_TYPE_SCRIPT,
};

const sourceTypes = {
	[process.env.SOURCE_TYPE_MANUALLY]: SOURCE_TYPE_MANUALLY,
	[process.env.SOURCE_TYPE_DB]: SOURCE_TYPE_DB,
	[process.env.SOURCE_TYPE_PROXY_PASS]: SOURCE_TYPE_PROXY_PASS,
	[process.env.SOURCE_TYPE_HEADER]: SOURCE_TYPE_HEADER,
	[process.env.SOURCE_TYPE_REQUEST]: SOURCE_TYPE_REQUEST,
	[process.env.SOURCE_TYPE_COOKIE]: SOURCE_TYPE_COOKIE,
	[process.env.SOURCE_TYPE_PLACEHOLDER]: SOURCE_TYPE_PLACEHOLDER,
	[process.env.SOURCE_TYPE_RAND]: SOURCE_TYPE_RAND,
};

export default sourceTypes;
