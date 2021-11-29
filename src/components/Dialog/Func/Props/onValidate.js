import * as dataTypes from 'structures/dataTypes.js';

const onValidate = (value) => () => {
	if (Array.isArray(value)) {
		let collector = [];

		value.forEach((dataTypeId) => {
			collector = [ ...collector, ...onValidate(dataTypeId)() ];
		});
		return collector;
	}
	else {
		switch (value) {
			case dataTypes.DATA_TYPE_NUMBER.id:
				return [ dataTypes.DATA_TYPE_NUMBER.id ];
			case dataTypes.DATA_TYPE_TEXT.id:
			case dataTypes.DATA_TYPE_RICHTEXT.id:
			case dataTypes.DATA_TYPE_PASSWORD.id:
				return [ 
					dataTypes.DATA_TYPE_NUMBER.id,
					dataTypes.DATA_TYPE_TEXT.id, 
					dataTypes.DATA_TYPE_TIME.id,
					dataTypes.DATA_TYPE_EMAIL.id,
					dataTypes.DATA_TYPE_MAC.id,
					dataTypes.DATA_TYPE_URL.id,
					dataTypes.DATA_TYPE_PASSWORD.id,
				];
			case dataTypes.DATA_TYPE_BOOLEAN.id:
				return [ dataTypes.DATA_TYPE_BOOLEAN.id ];
			case dataTypes.DATA_TYPE_TIME.id:
				return [ dataTypes.DATA_TYPE_TIME.id ];
			case dataTypes.DATA_TYPE_EMAIL.id:
				return [ dataTypes.DATA_TYPE_EMAIL.id ];
			case dataTypes.DATA_TYPE_IP.id:
				return [ dataTypes.DATA_TYPE_IP.id ];
			case dataTypes.DATA_TYPE_MAC.id:
				return [ dataTypes.DATA_TYPE_MAC.id ];
			case dataTypes.DATA_TYPE_URL.id:
				return [ dataTypes.DATA_TYPE_URL.id ];
			case dataTypes.DATA_TYPE_OBJECT.id:
				return [ dataTypes.DATA_TYPE_OBJECT.id ];
			case dataTypes.DATA_TYPE_ARRAY.id:
				return [ dataTypes.DATA_TYPE_ARRAY.id ];
			case dataTypes.DATA_TYPE_NULL.id:
				return [ dataTypes.DATA_TYPE_NULL.id ];
			default:
				return [
					dataTypes.DATA_TYPE_TEXT.id,
					dataTypes.DATA_TYPE_NUMBER.id,
					dataTypes.DATA_TYPE_BOOLEAN.id,
					dataTypes.DATA_TYPE_ARRAY.id,
					dataTypes.DATA_TYPE_OBJECT.id,
					dataTypes.DATA_TYPE_NULL.id,
					dataTypes.DATA_TYPE_RICHTEXT.id,
					dataTypes.DATA_TYPE_PASSWORD.id,
					dataTypes.DATA_TYPE_TIME.id,
					dataTypes.DATA_TYPE_EMAIL.id,
					dataTypes.DATA_TYPE_IP.id,
					dataTypes.DATA_TYPE_MAC.id,
					dataTypes.DATA_TYPE_URL.id,
				];
		}
	}
};

export default onValidate;
