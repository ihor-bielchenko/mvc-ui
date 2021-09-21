
const initialState = {
	data: [{
		id: 1,
		name: 'service 1',
	}, {
		id: 2,
		name: 'service 2',
	}, {
		id: 3,
		name: 'service 3',
	}],
	form: {},
};
const services = (state = initialState, action) => {
	return action.type === 'services'
		? action.payload()
		: state;
};

export default services;
