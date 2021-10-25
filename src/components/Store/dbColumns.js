
const initialState = {
	isCollection: true,
	data: {
		1: {
			id: 1,
			data_type_id: 0,
			name: 'ID',
			default_value: 0,
		},
		2: {
			id: 2,
			data_type_id: 1,
			name: 'title',
			default_value: '',
		},
		3: {
			id: 3,
			data_type_id: 3,
			name: 'age',
			default_value: 0,
		},
		4: {
			id: 4,
			data_type_id: 6,
			name: 'email',
			default_value: '',
		},
		5: {
			id: 5,
			data_type_id: 10,
			name: 'password',
			default_value: '',
		},
	},
};
const dbColumns = (state = initialState, action) => {
	return action.type === 'dbColumns'
		? action.payload()
		: state;
};

export default dbColumns;
