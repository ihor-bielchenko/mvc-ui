
export const initialState = () => ({
	id: 0,
	sidebarFlag: false,
});
const script = (state = initialState(), action) => {
	return action.type === 'script'
		? action.payload()
		: state;
};

export default script;
