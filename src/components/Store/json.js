
export const initialState = () => ({
	name: '',
	code: '200',
	sourceId: 0,
	tempValue: {
	},
});
const json = (state = initialState(), action) => {
	return action.type === 'json'
		? action.payload()
		: state;
};

export default json;
