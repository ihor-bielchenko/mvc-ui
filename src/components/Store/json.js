
const initialState = {
};
const json = (state = initialState, action) => {
	return action.type === 'json'
		? action.payload()
		: state;
};

export default json;
