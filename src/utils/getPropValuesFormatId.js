import Store from 'components/Store';
import {
	SOURCE_DB,
	SOURCE_PROXY_PASS,
} from 'structures/source.js';
import {
	COLUMN_ID,
	COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const getPropValuesFormatId = (body) => {
	const dbColumns = Store().getState().dbColumns;

	const bodyKeys = Object.keys(body);
	let formatId = process.env.FORMAT_STR;

	if (bodyKeys.length === 1 && body[bodyKeys[0]]) {
		switch (body[bodyKeys[0]].source_id) {
			case SOURCE_DB.id:
				formatId = (body[bodyKeys[0]].is_collection || body[bodyKeys[0]].select.length > 1)
					? process.env.FORMAT_ARR
					: (dbColumns.data[body[bodyKeys[0]].select[0]].type_id === COLUMN_ID.id ||
						dbColumns.data[body[bodyKeys[0]].select[0]].type_id === COLUMN_NUMBER.id)
						? process.env.FORMAT_NUM
						: process.env.FORMAT_STR;
				break;
			case SOURCE_PROXY_PASS.id:
				formatId = process.env.FORMAT_ARR;
				break;
			default:
				formatId = Number.isNaN(Number(body[bodyKeys[0]]))
					? process.env.FORMAT_STR
					: process.env.FORMAT_NUM;
				break;
		}
	}
	else if (bodyKeys.length === 1 && body[bodyKeys[0]] === '') {
		formatId = process.env.FORMAT_NULL;
	}
	else if (bodyKeys.length > 1) {
		formatId = process.env.FORMAT_ARR;
	}
	return formatId;
};

export default getPropValuesFormatId;
