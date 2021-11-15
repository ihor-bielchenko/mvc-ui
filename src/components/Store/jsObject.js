
export const initialState = () => ({
	renderFlag: false,
	data: {},
	json: {},
	blocks: {},
	tempValue: {},
});
const jsObject = (state = initialState(), action) => {
	return action.type === 'jsObject'
		? action.payload()
		: state;
};

export default jsObject;
