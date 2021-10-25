import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';

const getTemplate = (obj = {}) => {
	return {
		parent_id: 0,
		id: 0,
		data_type_id: DATA_TYPE_TEXT.id,
		key: 0,
		value: '',
		...obj,
	};
};

export default getTemplate;
