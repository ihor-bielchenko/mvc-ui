import Store from 'components/Store';
import {
	SOURCE_TYPE_DB,
	SOURCE_TYPE_PROXY_PASS,
} from 'structures/sourceTypes.js';
import {
	DATA_TYPE_ID,
	DATA_TYPE_TEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT,
	DATA_TYPE_NULL,
} from 'structures/dataTypes.js';

const getPropValuesFormatId = (body) => {
	const db = Store().getState().db;

	const bodyKeys = Object.keys(body);
	let formatId = DATA_TYPE_TEXT.id;

	if (bodyKeys.length === 1 && body[bodyKeys[0]]) {
		switch (body[bodyKeys[0]].source_type_id) {
			case SOURCE_TYPE_DB.id:
				formatId = (body[bodyKeys[0]].is_collection || body[bodyKeys[0]].select.length > 1)
					? DATA_TYPE_ARRAY.id
					: (db.columns[body[bodyKeys[0]].select[0]].data_type_id === DATA_TYPE_ID.id ||
						db.columns[body[bodyKeys[0]].select[0]].data_type_id === DATA_TYPE_NUMBER.id)
						? DATA_TYPE_NUMBER.id
						: DATA_TYPE_TEXT.id;
				break;
			case SOURCE_TYPE_PROXY_PASS.id:
				formatId = DATA_TYPE_OBJECT.id;
				break;
			default:
				formatId = Number.isNaN(Number(body[bodyKeys[0]]))
					? DATA_TYPE_TEXT.id
					: DATA_TYPE_NUMBER.id;
				break;
		}
	}
	else if (bodyKeys.length === 1 && body[bodyKeys[0]] === '') {
		formatId = DATA_TYPE_NULL.id;
	}
	else if (bodyKeys.length > 1) {
		formatId = DATA_TYPE_ARRAY.id;
	}
	return formatId;
};

export default getPropValuesFormatId;
