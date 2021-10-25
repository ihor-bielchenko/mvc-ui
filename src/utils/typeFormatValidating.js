import * as dataTypes from 'structures/dataTypes.js';

const typeFormatValidating = (value, useOnlyFormatFlag = false) => () => {
	if (useOnlyFormatFlag) {
		switch (value) {
			case dataTypes.DATA_TYPE_TEXT.id:
				return [ 
					dataTypes.DATA_TYPE_NUMBER.id,
					dataTypes.DATA_TYPE_TEXT.id,
				]; 
			default:
				return [ value ];
		}
	}

	switch (value) {
		case dataTypes.DATA_TYPE_ID.id:
		case dataTypes.DATA_TYPE_NUMBER.id:
			return [ dataTypes.DATA_TYPE_NUMBER.id ];
		case dataTypes.DATA_TYPE_TEXT.id:
		case dataTypes.DATA_TYPE_RICHTEXT.id:
		case dataTypes.DATA_TYPE_TIME.id:
		case dataTypes.DATA_TYPE_EMAIL.id:
		case dataTypes.DATA_TYPE_IP.id:
		case dataTypes.DATA_TYPE_MAC.id:
		case dataTypes.DATA_TYPE_URL.id:
		case dataTypes.DATA_TYPE_PASSWORD.id:
			return [ 
				dataTypes.DATA_TYPE_NUMBER.id,
				dataTypes.DATA_TYPE_TEXT.id, 
			];
		case dataTypes.DATA_TYPE_BOOLEAN.id:
			return [ dataTypes.DATA_TYPE_BOOLEAN.id ];
		default:
			return [
				dataTypes.DATA_TYPE_TEXT.id,
				dataTypes.DATA_TYPE_NUMBER.id,
				dataTypes.DATA_TYPE_BOOLEAN.id,
				dataTypes.DATA_TYPE_ARRAY.id,
				dataTypes.DATA_TYPE_OBJECT.id,
				dataTypes.DATA_TYPE_NULL.id,
			];
	}
};

export default typeFormatValidating;
