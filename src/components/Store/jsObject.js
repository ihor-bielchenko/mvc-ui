import {
	DATA_TYPE_TEXT,
	// DATA_TYPE_NUMBER,
	// DATA_TYPE_BOOLEAN,
	// DATA_TYPE_OBJECT,
	// DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

export const initialState = () => ({
	renderFlag: false,
	data: {
		1: {
			id: 1,
			parent_id: 0,
			data_type_id: DATA_TYPE_TEXT.id,
			key: '0',
			value: '',
		},
		// 2: {
		// 	id: 2,
		// 	parent_id: 0,
		// 	data_type_id: DATA_TYPE_TEXT.id,
		// 	key: 'key2',
		// 	value: 'value2',
		// },
		// 3: {
		// 	id: 3,
		// 	parent_id: 0,
		// 	data_type_id: DATA_TYPE_OBJECT.id,
		// 	key: 'key3',
		// 	value: undefined,
		// },
		// 4: {
		// 	id: 4,
		// 	parent_id: 0,
		// 	data_type_id: DATA_TYPE_ARRAY.id,
		// 	key: 'key4',
		// 	value: undefined,
		// },
		// 5: {
		// 	id: 5,
		// 	parent_id: 3,
		// 	data_type_id: DATA_TYPE_ARRAY.id,
		// 	key: 'key3-1',
		// 	value: undefined,
		// },
		// 8: {
		// 	id: 8,
		// 	parent_id: 3,
		// 	data_type_id: DATA_TYPE_ARRAY.id,
		// 	key: 'key3-2',
		// 	value: undefined,
		// },
		// 6: {
		// 	id: 6,
		// 	parent_id: 4,
		// 	data_type_id: DATA_TYPE_NUMBER.id,
		// 	key: '0',
		// 	value: 12,
		// },
		// 7: {
		// 	id: 7,
		// 	parent_id: 5,
		// 	data_type_id: DATA_TYPE_NUMBER.id,
		// 	key: '0',
		// 	value: 12,
		// },
	},
	json: {},
	blocks: {},
	tempValue: {},
});
const jsObject = (state = initialState(), action) => {
	return action.type === 'jsObject'
		? action.payload()
		: state;
};

export default jsObject;
