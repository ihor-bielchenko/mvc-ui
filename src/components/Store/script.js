
export const initialState = () => ({
	1: {
		id: 1,
		sidebarFlag: false,
		data: [],
		arrows: [],
	},
});
const script = (state = initialState(), action) => {
	return action.type === 'script'
		? action.payload()
		: state;
};

export default script;
