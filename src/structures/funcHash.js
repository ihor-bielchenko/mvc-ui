import { FUNC_CATEGORY_HASH } from './funcCategories.js';
import { DATA_TYPE_TEXT } from './dataTypes.js';
import { getLang } from 'components/Language';

export const FUNC_TEMPLATE_HASH_PASSWORD = {
	id: process.env.FUNC_TEMPLATE_HASH_PASSWORD,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_HASH_PASSWORDtext'),
	subtext: () => getLang('FUNC_TEMPLATE_HASH_PASSWORDsubtext'),
};
export const FUNC_TEMPLATE_HASH_BASE64_ENCODE = {
	id: process.env.FUNC_TEMPLATE_HASH_BASE64_ENCODE,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_HASH_BASE64_ENCODEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_HASH_BASE64_ENCODEsubtext'),
};
export const FUNC_TEMPLATE_HASH_BASE64_DECODE = {
	id: process.env.FUNC_TEMPLATE_HASH_BASE64_DECODE,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_HASH_BASE64_DECODEtext'),
	subtext: () => getLang('FUNC_TEMPLATE_HASH_BASE64_DECODEsubtext'),
};
export const FUNC_TEMPLATE_HASH_HASH = {
	id: process.env.FUNC_TEMPLATE_HASH_HASH,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_HASH_HASHtext'),
	subtext: () => getLang('FUNC_TEMPLATE_HASH_HASHsubtext'),
};
export const FUNC_TEMPLATE_HASH_CRYPTO = {
	id: process.env.FUNC_TEMPLATE_HASH_CRYPTO,
	category_id: FUNC_CATEGORY_HASH.id,
	data_type_id: DATA_TYPE_TEXT.id,
	text: () => getLang('FUNC_TEMPLATE_HASH_CRYPTOtext'),
	subtext: () => getLang('FUNC_TEMPLATE_HASH_CRYPTOsubtext'),
};
const funcHash =  {
	[process.env.FUNC_TEMPLATE_HASH_PASSWORD]: FUNC_TEMPLATE_HASH_PASSWORD,
	[process.env.FUNC_TEMPLATE_HASH_BASE64_ENCODE]: FUNC_TEMPLATE_HASH_BASE64_ENCODE,
	[process.env.FUNC_TEMPLATE_HASH_BASE64_DECODE]: FUNC_TEMPLATE_HASH_BASE64_DECODE,
	[process.env.FUNC_TEMPLATE_HASH_HASH]: FUNC_TEMPLATE_HASH_HASH,
	[process.env.FUNC_TEMPLATE_HASH_CRYPTO]: FUNC_TEMPLATE_HASH_CRYPTO,
};

export default funcHash;
