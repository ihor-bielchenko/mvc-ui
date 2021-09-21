
export const initialState = () => ({
	name: '',
	body: {
		[Date.now()]: {
			key: '0',
			value: '',
		},
	},
	tempValue: {
	},
});
const prop = (state = initialState(), action) => {
	return action.type === 'prop'
		? action.payload()
		: state;
};

export default prop;
