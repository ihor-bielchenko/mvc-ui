
const initialState = {
	/*name: {
		anchorEl: null,
		value: '',
		label: '',
	},*/
};
const menu = (state = initialState, action) => {
	return action.type === 'menu'
		? action.payload()
		: state;
};

export default menu;
