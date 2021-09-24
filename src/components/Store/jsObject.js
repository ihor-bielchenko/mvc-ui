import {
	COLUMN_TEXT,
	// COLUMN_NUMBER,
	// COLUMN_BOOLEAN,
	// COLUMN_OBJ,
	// COLUMN_ARR,
} from 'structures/columnTypes.js';

export const setJsObject = () => ({
	renderFlag: false,
	data: {
		1: {
			id: 1,
			type_id: COLUMN_TEXT.id,
			key: 'key1',
			value: 'value1',
		},
		// 2: {
		// 	id: 2,
		// 	type_id: COLUMN_TEXT.id,
		// 	key: 'key2',
		// 	value: 'value2',
		// },
		// 3: {
		// 	id: 3,
		// 	type_id: COLUMN_OBJ.id,
		// 	key: 'key3',
		// 	value: {
		// 		5: {
		// 			id: 5,
		// 			type_id: COLUMN_NUMBER.id,
		// 			key: 'key3-1',
		// 			value: 32,
		// 		}
		// 	},
		// },
		// 4: {
		// 	id: 4,
		// 	type_id: COLUMN_ARR.id,
		// 	key: 'key4',
		// 	value: {
		// 		6: {
		// 			id: 6,
		// 			type_id: COLUMN_NUMBER.id,
		// 			key: '0',
		// 			value: 12,
		// 		}
		// 	},
		// },
	},
	temp: {},
	tempValue: {},
});
const jsObject = (state = setJsObject(), action) => {
	return action.type === 'jsObject'
		? action.payload()
		: state;
};

export default jsObject;
