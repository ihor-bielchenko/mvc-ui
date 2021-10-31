import {
	DATA_TYPE_ATOMIC,
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
			data_type_id: DATA_TYPE_ATOMIC.id,
			key: '0',
			value: '',
		},
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
