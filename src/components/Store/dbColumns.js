
const initialState = {
	isCollection: true,
	data: {
		1: {
			id: 1,
			type_id: 0,
			name: 'ID',
		},
		2: {
			id: 2,
			type_id: 1,
			name: 'title',
		},
		3: {
			id: 3,
			type_id: 3,
			name: 'age',
		},
		4: {
			id: 4,
			type_id: 6,
			name: 'email',
		},
		5: {
			id: 5,
			type_id: 10,
			name: 'password',
		},
	},
};
const dbColumns = (state = initialState, action) => {
	return action.type === 'dbColumns'
		? action.payload()
		: state;
};

export default dbColumns;
