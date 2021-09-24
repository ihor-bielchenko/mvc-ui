import {
	FORMAT_ATOMIC,
	FORMAT_OBJ,
	FORMAT_ARR,
} from 'structures/format.js';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';

const switchFormatId = (id, jsObject) => {
	if (typeof jsObject.temp[id] === 'object') {
		if ((jsObject.tempValue['select'] || []).length > 0) {
			if (prop.format_id === FORMAT_ATOMIC.id) {
				prop.format_id = FORMAT_OBJ.id;
			}
			else {
				prop.body[id].type_id = COLUMN_OBJ.id;
			}
		}
		if (jsObject.tempValue['is_collection']) {
			if (prop.format_id === FORMAT_ATOMIC.id) {
				prop.format_id = FORMAT_ARR.id;
			}
			else {
				prop.body[id].type_id = COLUMN_ARR.id;
			}
		}
	}
	return prop;
};

export default switchFormatId;
