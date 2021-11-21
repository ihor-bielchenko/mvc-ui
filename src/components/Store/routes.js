import {
	DATA_TYPE_TEXT,
	DATA_TYPE_NUMBER,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { PROTOCOL_TYPE_HTTP } from 'structures/protocol.js';
import { METHOD_TYPE_GET } from 'structures/method.js';

export const initialState = () => ({
	data: [{
		id: 1,
		service_id: 1,
		name: 'route 1 - 1',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_TYPE_HTTP.id,
		method_id: 1,
		path: [{
			id: 1,
			path_type_id: 1,
			value: 'path1',
		}, {
			id: 2,
			path_type_id: 1,
			value: 'path2',
		}],
		response: {
			50: {
				id: 50,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '0',
				value: 'jgjgjjg',
			},
		},
	}, {
		id: 2,
		service_id: 1,
		name: 'route 1 - 2',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_TYPE_HTTP.id,
		method_id: 2,
		response: {
			51: {
				id: 51,
				parent_id: 0,
				data_type_id: DATA_TYPE_NUMBER.id,
				key: '0',
				value: '',
			},
		},
	}, {
		id: 3,
		service_id: 1,
		name: 'route 1 - 3',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_TYPE_HTTP.id,
		method_id: 1,
		path: [{
			id: 3,
			path_type_id: 1,
			value: 'path1',
		}, {
			id: 4,
			path_type_id: 1,
			value: 'path2',
		}, {
			id: 5,
			path_type_id: 2,
			value: 'placeholder3',
		}],
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: 0,
				value: undefined,
			},
			49: {
				id: 49,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: 'fetch-key1',
				value: '321',
			},
		},
	}, {
		id: 4,
		service_id: 1,
		name: 'route 1 - 4',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_TYPE_HTTP.id,
		method_id: 3,
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				data_type_id: DATA_TYPE_ARRAY.id,
				key: 0,
				value: undefined,
			},
			52: {
				id: 52,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '0',
				value: '',
			},
			53: {
				id: 53,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '1',
				value: '',
			},
			54: {
				id: 54,
				parent_id: 0,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: '2',
				value: undefined,
			},
			55: {
				id: 55,
				parent_id: 54,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '1',
				value: '',
			},
		},
	}, {
		id: 5,
		service_id: 1,
		name: 'route 1 - 5',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_TYPE_HTTP.id,
		method_id: 1,
		path: [{
			id: 6,
			path_type_id: 1,
			value: 'path1',
		}, {
			id: 7,
			path_type_id: 2,
			value: 'placeholder3',
		}, {
			id: 8,
			path_type_id: 1,
			value: 'path2',
		}],
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				data_type_id: DATA_TYPE_ARRAY.id,
				key: 0,
				value: undefined,
			},
			56: {
				id: 56,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '0',
				value: '000',
			},
			57: {
				id: 57,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '1',
				value: '111',
			},
			58: {
				id: 58,
				parent_id: 0,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: '2',
				value: undefined,
			},
			59: {
				id: 59,
				parent_id: 58,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '1',
				value: '222-000',
			},
		},
	}],
	form: {
		id: 0,
		name: '',
		description: '',
		service_id: 1,
		script_id: 1,
		method_id: METHOD_TYPE_GET.id,
		protocol_id: PROTOCOL_TYPE_HTTP.id,
		url: [/*{
			index: 0,
			route_id: 1,
			route_url_type_id: 1,
			value: '',
		}*/],
		response: {
			0: {
				id: 0,
				parent_id: 0,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '0',
				value: '',
			},
		},
	},
});
const routes = (state = initialState(), action) => {
	return action.type === 'routes'
		? action.payload()
		: state;
};

export default routes;
