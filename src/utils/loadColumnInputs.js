import * as columnTypes from 'structures/columnTypes.js';

const loadColumnInputs = (typeId) => () => {
	switch (typeId) {
		case columnTypes.COLUMN_TEXT.id:
		default:
			return import('components/Input/Text');
		case columnTypes.COLUMN_NUMBER.id:
		case columnTypes.COLUMN_ID.id:
			return import('components/Input/Numeric');
	}
};

export default loadColumnInputs;
