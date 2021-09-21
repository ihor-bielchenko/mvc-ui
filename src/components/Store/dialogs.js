
const dialogs = (state = {}, action) => {
	return action.type === 'dialogs'
		? action.payload()
		: state;
};

export default dialogs;
