import * as format from 'structures/format.js';
import * as columnTypes from 'structures/columnTypes.js';

const typeFormatValidating = (value, useOnlyFormatFlag = false) => () => {
	if (useOnlyFormatFlag) {
		switch (value) {
			case format.FORMAT_STR.id:
				return [ 
					process.env.FORMAT_NUM,
					process.env.FORMAT_STR, 
				]; 
			default:
				return [ value ];
		}
	}

	switch (value) {
		case columnTypes.COLUMN_ID.id:
		case columnTypes.COLUMN_NUMBER.id:
			return [ process.env.FORMAT_NUM ];
		case columnTypes.COLUMN_TEXT.id:
		case columnTypes.COLUMN_RICHTEXT.id:
		case columnTypes.COLUMN_TIME.id:
		case columnTypes.COLUMN_EMAIL.id:
		case columnTypes.COLUMN_IP.id:
		case columnTypes.COLUMN_MAC.id:
		case columnTypes.COLUMN_URL.id:
		case columnTypes.COLUMN_PASSWORD.id:
			return [ 
				process.env.FORMAT_NUM,
				process.env.FORMAT_STR, 
			];
		case columnTypes.COLUMN_BOOLEAN.id:
			return [ process.env.FORMAT_BOOL ];
		default:
			return [
				process.env.FORMAT_STR,
				process.env.FORMAT_NUM,
				process.env.FORMAT_ARR,
				process.env.FORMAT_BOOL,
				process.env.FORMAT_NULL,
			];
	}
};

export default typeFormatValidating;
