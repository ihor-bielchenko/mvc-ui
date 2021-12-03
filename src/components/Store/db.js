
const initialState = () => ({
	isCollection: true,
	tables: {},
	columns: {},
	tempValue: {},
});
const db = (state = initialState(), action) => {
	return action.type === 'db'
		? action.payload()
		: state;
};

export default db;
