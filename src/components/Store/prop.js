import { COLUMN_TEXT } from 'structures/columnTypes.js';

export const initialState = () => ({
	name: '',
	format_id: '',
	body: {
		[Date.now()]: {
			type_id: COLUMN_TEXT.id,
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
