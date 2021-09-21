
const initialState = {
	flag: false,
	message: '',
	vertical: 'bottom',
	horizontal: 'right',
};
const alert = (state = initialState, action) => {
	return action.type === 'alert'
		? action.payload()
		: state;
};

export default alert;
