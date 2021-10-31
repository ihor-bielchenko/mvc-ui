
export const initialState = () => ({
	name: '',
	sourceId: 0,
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
