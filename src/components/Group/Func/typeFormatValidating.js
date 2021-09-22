import * as columnTypes from 'structures/columnTypes.js';

const typeFormatValidating = (value, useOnlyFormatFlag = false) => () => {
	if (useOnlyFormatFlag) {
		switch (value) {
			case columnTypes.COLUMN_TEXT.id:
				return [ 
					columnTypes.COLUMN_NUMBER.id,
					columnTypes.COLUMN_TEXT.id,
				]; 
			default:
				return [ value ];
		}
	}

	switch (value) {
		case columnTypes.COLUMN_ID.id:
		case columnTypes.COLUMN_NUMBER.id:
			return [ columnTypes.COLUMN_NUMBER.id ];
		case columnTypes.COLUMN_TEXT.id:
		case columnTypes.COLUMN_RICHTEXT.id:
		case columnTypes.COLUMN_TIME.id:
		case columnTypes.COLUMN_EMAIL.id:
		case columnTypes.COLUMN_IP.id:
		case columnTypes.COLUMN_MAC.id:
		case columnTypes.COLUMN_URL.id:
		case columnTypes.COLUMN_PASSWORD.id:
			return [ 
				columnTypes.COLUMN_NUMBER.id,
				columnTypes.COLUMN_TEXT.id, 
			];
		case columnTypes.COLUMN_BOOLEAN.id:
			return [ columnTypes.COLUMN_BOOLEAN.id ];
		default:
			return [
				columnTypes.COLUMN_TEXT.id,
				columnTypes.COLUMN_NUMBER.id,
				columnTypes.COLUMN_BOOLEAN.id,
				columnTypes.COLUMN_ARR.id,
				columnTypes.COLUMN_OBJ.id,
				columnTypes.COLUMN_NULL.id,
			];
	}
};

export default typeFormatValidating;
