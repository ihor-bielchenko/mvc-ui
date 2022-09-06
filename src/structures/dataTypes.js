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
import { getLang } from 'components/Language';

export const DATA_TYPE_ATOMIC = {
	id: process.env.DATA_TYPE_ATOMIC,
	icon: FindInPageIcon,
	text: () => getLang('AtomicDataTypeValue'),
};
export const DATA_TYPE_ID = {
	id: process.env.DATA_TYPE_ID,
	icon: FindInPageIcon,
	text: () => 'id',
};
export const DATA_TYPE_TEXT = {
	id: process.env.DATA_TYPE_TEXT,
	icon: TextFieldsIcon,
	text: () => getLang('StrDataTypeValue'),
};
export const DATA_TYPE_NUMBER = {
	id: process.env.DATA_TYPE_NUMBER,
	icon: AllInclusiveIcon,
	text: () => getLang('Num'),
};
export const DATA_TYPE_BOOLEAN = {
	id: process.env.DATA_TYPE_BOOLEAN,
	icon: ExposureIcon,
	disabled: true,
	text: () => getLang('Boolean1'),
};
export const DATA_TYPE_OBJECT = {
	id: process.env.DATA_TYPE_OBJECT,
	icon: InsertDriveFileIcon,
	text: () => getLang('Obj'),
};
export const DATA_TYPE_ARRAY = {
	id: process.env.DATA_TYPE_ARRAY,
	icon: InsertDriveFileIcon,
	text: () => getLang('Arr'),
};
export const DATA_TYPE_NULL = {
	id: process.env.DATA_TYPE_NULL,
	icon: InsertDriveFileIcon,
	text: () => getLang('NullDataTypeValue'),
};
export const DATA_TYPE_RICHTEXT = {
	id: process.env.DATA_TYPE_RICHTEXT,
	icon: TextFormatIcon,
	disabled: true,
	text: () => getLang('Editor2'),
};
export const DATA_TYPE_TIME = {
	id: process.env.DATA_TYPE_TIME,
	icon: QueryBuilderIcon,
	disabled: true,
	text: () => getLang('LogicFuncTimeName'),
};
export const DATA_TYPE_EMAIL = {
	id: process.env.DATA_TYPE_EMAIL,
	icon: MailIcon,
	text: () => 'Email',
};
export const DATA_TYPE_IP = {
	id: process.env.DATA_TYPE_IP,
	icon: DnsIcon,
	disabled: true,
	text: () => getLang('IPA'),
};
export const DATA_TYPE_MAC = {
	id: process.env.DATA_TYPE_MAC,
	icon: MemoryIcon,
	disabled: true,
	text: () => getLang('MAC'),
};
export const DATA_TYPE_URL = {
	id: process.env.DATA_TYPE_URL,
	icon: LinkIcon,
	disabled: true,
	text: () => 'URL',
};
export const DATA_TYPE_PASSWORD = {
	id: process.env.DATA_TYPE_PASSWORD,
	icon: LockIcon,
	text: () => getLang('Password'),
};
export const DATA_TYPE_FILE = {
	id: process.env.DATA_TYPE_FILE,
	icon: InsertDriveFileIcon,
	disabled: true,
	text: () => getLang('File'),
};
export const DATA_TYPE_MIXED = {
	id: process.env.DATA_TYPE_MIXED,
	icon: InsertDriveFileIcon,
	disabled: true,
	text: () => getLang('MixedDataTypeValue'),
};

const dataTypes = {
	[process.env.DATA_TYPE_ATOMIC]: DATA_TYPE_ATOMIC,
	[process.env.DATA_TYPE_ID]: DATA_TYPE_ID,
	[process.env.DATA_TYPE_TEXT]: DATA_TYPE_TEXT,
	[process.env.DATA_TYPE_NUMBER]: DATA_TYPE_NUMBER,
	[process.env.DATA_TYPE_BOOLEAN]: DATA_TYPE_BOOLEAN,
	[process.env.DATA_TYPE_OBJECT]: DATA_TYPE_OBJECT,
	[process.env.DATA_TYPE_ARRAY]: DATA_TYPE_ARRAY,
	[process.env.DATA_TYPE_NULL]: DATA_TYPE_NULL,
	[process.env.DATA_TYPE_RICHTEXT]: DATA_TYPE_RICHTEXT,
	[process.env.DATA_TYPE_TIME]: DATA_TYPE_TIME,
	[process.env.DATA_TYPE_EMAIL]: DATA_TYPE_EMAIL,
	[process.env.DATA_TYPE_IP]: DATA_TYPE_IP,
	[process.env.DATA_TYPE_MAC]: DATA_TYPE_MAC,
	[process.env.DATA_TYPE_URL]: DATA_TYPE_URL,
	[process.env.DATA_TYPE_PASSWORD]: DATA_TYPE_PASSWORD,
	[process.env.DATA_TYPE_FILE]: DATA_TYPE_FILE,
};

export default dataTypes;
