import {
	COLUMN_TEXT,
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
	COLUMN_OBJ,
 	COLUMN_ARR,
 	COLUMN_NULL,
} from 'structures/columnTypes.js';

const templates = {
	[COLUMN_TEXT.id]: '',
	[COLUMN_NUMBER.id]: 0,
	[COLUMN_BOOLEAN.id]: true,
	[COLUMN_OBJ.id]: {},
	[COLUMN_ARR.id]: {},
	[COLUMN_NULL.id]: null,
};
const getDefaultValueByTypeId = (typeId) => templates[typeId] ?? '';

export default getDefaultValueByTypeId;
