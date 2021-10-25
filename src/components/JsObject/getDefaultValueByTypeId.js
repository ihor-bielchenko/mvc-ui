import {
	DATA_TYPE_ID,
	DATA_TYPE_TEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_OBJECT,
 	DATA_TYPE_ARRAY,
 	DATA_TYPE_NULL,
} from 'structures/dataTypes.js';

const templates = {
	[DATA_TYPE_TEXT.id]: '',
	[DATA_TYPE_NUMBER.id]: 0,
	[DATA_TYPE_ID.id]: 0,
	[DATA_TYPE_BOOLEAN.id]: true,
	[DATA_TYPE_OBJECT.id]: undefined,
	[DATA_TYPE_ARRAY.id]: undefined,
	[DATA_TYPE_NULL.id]: null,
};
const getDefaultValueByTypeId = (dataTypeId) => templates[dataTypeId] ?? '';

export default getDefaultValueByTypeId;
