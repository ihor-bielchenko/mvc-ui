
export const initialState = () => ({
	name: '',
	sourceId: 0,
	tempValue: {
	},
});
const prop = (state = initialState(), action) => {
	return action.type === 'prop'
		? action.payload()
		: state;
};

export default prop;
