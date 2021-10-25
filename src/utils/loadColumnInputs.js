import * as dataTypes from 'structures/dataTypes.js';

const loadColumnInputs = (dataTypeId) => () => {
	switch (dataTypeId) {
		case dataTypes.DATA_TYPE_TEXT.id:
		default:
			return import('components/Input/Text');
		case dataTypes.DATA_TYPE_NUMBER.id:
		case dataTypes.DATA_TYPE_ID.id:
			return import('components/Input/Numeric');
	}
};

export default loadColumnInputs;
