import { PROTOCOL_TYPE_HTTP } from 'structures/protocol.js';
import { METHOD_TYPE_GET } from 'structures/method.js';

export const initialState = () => ({
	data: [],
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
		response: {},
	},
});
const routes = (state = initialState(), action) => {
	return action.type === 'routes'
		? action.payload()
		: state;
};

export default routes;
