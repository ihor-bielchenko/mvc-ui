import {
	DATA_TYPE_ID,
	DATA_TYPE_TEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_EMAIL,
	DATA_TYPE_PASSWORD,
} from 'structures/dataTypes.js';

const initialState = {
	isCollection: true,
	tables: {
		1: {
			id: 1,
			name: 'main',
		}
	},
	columns: {
		1: {
			id: 1,
			data_type_id: DATA_TYPE_ID.id,
			name: 'ID',
			default_value: 0,
		},
		2: {
			id: 2,
			data_type_id: DATA_TYPE_TEXT.id,
			name: 'title',
			default_value: '',
		},
		3: {
			id: 3,
			data_type_id: DATA_TYPE_NUMBER.id,
			name: 'age',
			default_value: 0,
		},
		4: {
			id: 4,
			data_type_id: DATA_TYPE_EMAIL.id,
			name: 'email',
			default_value: '',
		},
		5: {
			id: 5,
			data_type_id: DATA_TYPE_PASSWORD.id,
			name: 'password',
			default_value: '',
		},
	},
};
const db = (state = initialState, action) => {
	return action.type === 'db'
		? action.payload()
		: state;
};

export default db;
