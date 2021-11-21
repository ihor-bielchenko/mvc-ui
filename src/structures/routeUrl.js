
export const ROUTE_URL_TYPE_VALUE = {
	id: process.env.ROUTE_URL_TYPE_VALUE,
	text: () => 'Путь',
};
export const ROUTE_URL_TYPE_PLACEHOLDER = {
	id: process.env.ROUTE_URL_TYPE_PLACEHOLDER,
	text: () => 'Плэйсхолдер',
};

const routeUrl = {
	[process.env.ROUTE_URL_TYPE_VALUE]: ROUTE_URL_TYPE_VALUE,
	[process.env.ROUTE_URL_TYPE_PLACEHOLDER]: ROUTE_URL_TYPE_PLACEHOLDER,
};

export default routeUrl;