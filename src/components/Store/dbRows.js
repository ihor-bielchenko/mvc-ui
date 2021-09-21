
const initialState = {
	rowsPerPage: 20,
	page: 0,
	total: 0,
	data: [{
		1: 1,
		2: 'Title1',
		3: 18,
		4: 'test1@mail.com',
		5: 'test1password',
	}, {
		1: 2,
		2: 'Title 2',
		3: 19,
		4: 'test2@mail.com',
		5: 'test2password',
	}],
	query: '',
	queryPlaceholders: [],
	select: [],
	filter: {},
	sort: {},
};
const dbRows = (state = initialState, action) => {
	return action.type === 'dbRows'
		? action.payload()
		: state;
};

export default dbRows;
