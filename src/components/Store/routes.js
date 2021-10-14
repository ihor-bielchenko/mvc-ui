import {
	COLUMN_TEXT,
	COLUMN_NUMBER,
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import { PROTOCOL_HTTP } from 'structures/protocol.js';

const initialState = {
	data: [{
		id: 1,
		service_id: 1,
		name: 'route 1 - 1',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_HTTP.id,
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
		response: {
			50: {
				id: 50,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '0',
				value: 'jgjgjjg',
			},
		},
	}, {
		id: 2,
		service_id: 1,
		name: 'route 1 - 2',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_HTTP.id,
		method_id: 2,
		response: {
			51: {
				id: 51,
				parent_id: 0,
				type_id: COLUMN_NUMBER.id,
				key: '0',
				value: '',
			},
		},
	}, {
		id: 3,
		service_id: 1,
		name: 'route 1 - 3',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_HTTP.id,
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
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				type_id: COLUMN_OBJ.id,
				key: 0,
				value: undefined,
			},
			49: {
				id: 49,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: 'fetch-key1',
				value: '321',
			},
		},
	}, {
		id: 4,
		service_id: 1,
		name: 'route 1 - 4',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_HTTP.id,
		method_id: 3,
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				type_id: COLUMN_ARR.id,
				key: 0,
				value: undefined,
			},
			52: {
				id: 52,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '0',
				value: '',
			},
			53: {
				id: 53,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '1',
				value: '',
			},
			54: {
				id: 54,
				parent_id: 0,
				type_id: COLUMN_OBJ.id,
				key: '2',
				value: undefined,
			},
			55: {
				id: 55,
				parent_id: 54,
				type_id: COLUMN_TEXT.id,
				key: '1',
				value: '',
			},
		},
	}, {
		id: 5,
		service_id: 1,
		name: 'route 1 - 5',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_HTTP.id,
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
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				type_id: COLUMN_ARR.id,
				key: 0,
				value: undefined,
			},
			56: {
				id: 56,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '0',
				value: '000',
			},
			57: {
				id: 57,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '1',
				value: '111',
			},
			58: {
				id: 58,
				parent_id: 0,
				type_id: COLUMN_OBJ.id,
				key: '2',
				value: undefined,
			},
			59: {
				id: 59,
				parent_id: 58,
				type_id: COLUMN_TEXT.id,
				key: '1',
				value: '222-000',
			},
		},
	}],
	form: {
		id: 5,
		service_id: 1,
		name: 'route 1 - 5',
		domain_path: 'drivedatum.com',
		protocol_id: PROTOCOL_HTTP.id,
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
		response: {
			0: {
				id: 0,
				parent_id: undefined,
				type_id: COLUMN_ARR.id,
				key: 0,
				value: undefined,
			},
			52: {
				id: 52,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '0',
				value: '',
			},
			53: {
				id: 53,
				parent_id: 0,
				type_id: COLUMN_TEXT.id,
				key: '1',
				value: '',
			},
			54: {
				id: 54,
				parent_id: 0,
				type_id: COLUMN_OBJ.id,
				key: '2',
				value: undefined,
			},
			55: {
				id: 55,
				parent_id: 54,
				type_id: COLUMN_TEXT.id,
				key: '1',
				value: '',
			},
		},
	},
};
const routes = (state = initialState, action) => {
	return action.type === 'routes'
		? action.payload()
		: state;
};

export default routes;
