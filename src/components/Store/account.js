
export const initialState = () => ({
	id: 1,
	path: 'user1.drivedatum.com',
	email: 'ihor@drivedatum.com',
	name: '',
});
const account = (state = initialState(), action) => {
	return action.type === 'account'
		? action.payload()
		: state;
};

export default account;
