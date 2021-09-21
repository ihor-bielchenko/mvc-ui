
export const initialState = () => ({
	name: '',
	format_id: '',
	body: {
		[Date.now()]: {
			type_id: '',
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
