
export const initialState = () => ({
	id: 0,
	unique_name: '',
	path: '',
	email: '',
	name: '',
});
const account = (state = initialState(), action) => {
	return action.type === 'account'
		? action.payload()
		: state;
};

export default account;
