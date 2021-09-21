const initialState = {
	loaderFlag: false,
	loaderOpacity: .6,
};
const config = (state = initialState, action) => {
	return action.type === 'config'
		? action.payload()
		: state;
};

export default config;
