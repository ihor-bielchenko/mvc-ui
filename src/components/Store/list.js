
export const initialState = () => ({
	total: 0,
	rowsPerPage: 20,
	currentPage: 0,
	search: {
		query: '',
		isExactMatch: false,
		isCollection: false,
		placeholders: [/*{
			text: 'Test',
		}*/],
	},
	select: [],
	fetch: [],
	data: [/*{
		1: 1,
		2: 'test1',
		3: 19,
		4: 'eee@eee.eee',
		5: 'cmcmcmcc',
	}*/],
});
const list = (state = initialState(), action) => {
	return action.type === 'list'
		? action.payload()
		: state;
};

export default list;