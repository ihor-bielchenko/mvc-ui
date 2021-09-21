
export const initialState = () => ({
	name: '',
	body: {
		[Date.now()]: '',
	},
	tempValue: {
	},
});
const prop = (state = initialState(), action) => {
	return action.type === 'prop'
		? action.payload()
		: state;
};

export default prop;
