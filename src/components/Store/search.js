
const initialState = () => ({
	isExactMatch: false,
	isCollection: false,
	placeholders: [/*{
		text: 'Test',
	}*/],
	data: [],
});
const search = (state = initialState(), action) => {
	return action.type === 'search'
		? action.payload()
		: state;
};

export default search;