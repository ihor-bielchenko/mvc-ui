import { COLUMN_TEXT } from 'structures/columnTypes.js';

const getTemplate = (obj = {}) => {
	return {
		parent_id: 0,
		id: 0,
		type_id: COLUMN_TEXT.id,
		key: 0,
		value: '',
		...obj,
	};
};

export default getTemplate;
