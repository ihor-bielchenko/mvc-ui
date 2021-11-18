import {
	DATA_TYPE_ID,
	DATA_TYPE_TEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_EMAIL,
	DATA_TYPE_PASSWORD,
} from 'structures/dataTypes.js';

const initialState = () => ({
	isCollection: true,
	tables: {
		1: {
			id: 1,
			name: 'main',
			description: 'example text',
			is_collection: false,
			x: 90,
			y: 90,
		}
	},
	columns: {
		1: {
			id: 1,
			data_type_id: DATA_TYPE_ID.id,
			name: 'ID',
			description: 'example text',
			default_value: 0,
			required: true,
		},
		2: {
			id: 2,
			data_type_id: DATA_TYPE_TEXT.id,
			name: 'title',
			description: 'example text',
			default_value: '',
			required: false,
		},
		3: {
			id: 3,
			data_type_id: DATA_TYPE_NUMBER.id,
			name: 'age',
			description: 'example text',
			default_value: 0,
			required: false,
		},
		4: {
			id: 4,
			data_type_id: DATA_TYPE_EMAIL.id,
			name: 'email',
			description: 'example text',
			default_value: '',
			required: false,
		},
		5: {
			id: 5,
			data_type_id: DATA_TYPE_PASSWORD.id,
			name: 'password',
			description: 'example text',
			default_value: '',
			required: false,
		},
	},
	list: {
		total: 49,
		rowsPerPage: 20,
		currentPage: 0,
		data: [/*{
			1: 1,
			2: 'test1',
			3: 19,
			4: 'eee@eee.eee',
			5: 'cmcmcmcc',
		}*/],
	},
	tempValue: {},
});
const db = (state = initialState(), action) => {
	return action.type === 'db'
		? action.payload()
		: state;
};

export default db;
