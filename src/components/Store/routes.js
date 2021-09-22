
const initialState = {
	data: [{
		id: 1,
		service_id: 1,
		name: 'route 1 - 1',
		domain_path: 'drivedatum.com',
		method_id: 1,
		path: [{
			id: 1,
			type_id: 1,
			value: 'path1',
		}, {
			id: 2,
			type_id: 1,
			value: 'path2',
		}],
	}, {
		id: 2,
		service_id: 1,
		name: 'route 1 - 2',
		domain_path: 'drivedatum.com',
		method_id: 2,
	}, {
		id: 3,
		service_id: 1,
		name: 'route 1 - 3',
		domain_path: 'drivedatum.com',
		method_id: 1,
		path: [{
			id: 3,
			type_id: 1,
			value: 'path1',
		}, {
			id: 4,
			type_id: 1,
			value: 'path2',
		}, {
			id: 5,
			type_id: 2,
			value: 'placeholder3',
		}],
	}, {
		id: 4,
		service_id: 1,
		name: 'route 1 - 4',
		domain_path: 'drivedatum.com',
		method_id: 3,
	}, {
		id: 5,
		service_id: 1,
		name: 'route 1 - 5',
		domain_path: 'drivedatum.com',
		method_id: 1,
		path: [{
			id: 6,
			type_id: 1,
			value: 'path1',
		}, {
			id: 7,
			type_id: 2,
			value: 'placeholder3',
		}, {
			id: 8,
			type_id: 1,
			value: 'path2',
		}],
	}],
	form: {
		id: 5,
		service_id: 1,
		name: 'route 1 - 5',
		domain_path: 'drivedatum.com',
		method_id: 1,
		path: [{
			id: 6,
			type_id: 1,
			value: 'path1',
		}, {
			id: 7,
			type_id: 2,
			value: 'placeholder3',
		}, {
			id: 8,
			type_id: 1,
			value: 'path2',
		}, {
			id: 9,
			type_id: 2,
			value: 'placeholder4',
		}, {
			id: 10,
			type_id: 2,
			value: 'placeholder5',
		}, {
			id: 11,
			type_id: 2,
			value: 'placeholder6',
		}],
	},
};
const routes = (state = initialState, action) => {
	return action.type === 'routes'
		? action.payload()
		: state;
};

export default routes;
