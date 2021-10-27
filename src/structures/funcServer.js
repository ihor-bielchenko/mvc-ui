import { FUNC_CATEGORY_SERVER } from './funcCategories.js';
import { DATA_TYPE_OBJECT } from './dataTypes.js';

export const FUNC_TEMPLATE_SERVER_HTTP = {
	id: process.env.FUNC_TEMPLATE_SERVER_HTTP,
	category_id: FUNC_CATEGORY_SERVER.id,
	data_type_id: DATA_TYPE_OBJECT.id,
	text: () => 'HTTP запрос',
	subtext: () => 'Отправка и получение данных по HTTP',
};

const funcServer = {
	[process.env.FUNC_TEMPLATE_SERVER_HTTP]: FUNC_TEMPLATE_SERVER_HTTP,
};

export default funcServer;