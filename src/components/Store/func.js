
export const initialState = () => ({
	name: '',
	category_id: '',
	template_id: '',
	arguments: {
	},
});
const func = (state = initialState(), action) => {
	return action.type === 'func'
		? action.payload()
		: state;
};

export default func;
