import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_TEXT, 
} from 'structures/dataTypes.js';

export const initialState = () => ({
	name: '',
	data_type_id: DATA_TYPE_ATOMIC.id,
	body: {
		[Date.now()]: {
			data_type_id: DATA_TYPE_TEXT.id,
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
