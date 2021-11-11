import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

const switchFormatId = (id) => {
	if (typeof jsObject.data[id] === 'object') {
		if ((jsObject.tempValue['select'] || []).length > 0) {
			if (prop.format_type_id === DATA_TYPE_ATOMIC.id) {
				prop.format_type_id = DATA_TYPE_OBJECT.id;
			}
			else {
				prop.body[id].data_type_id = DATA_TYPE_OBJECT.id;
			}
		}
		if (jsObject.tempValue['is_collection']) {
			if (prop.format_type_id === DATA_TYPE_ATOMIC.id) {
				prop.format_type_id = DATA_TYPE_ARRAY.id;
			}
			else {
				prop.body[id].data_type_id = DATA_TYPE_ARRAY.id;
			}
		}
	}
	return prop;
};

export default switchFormatId;
