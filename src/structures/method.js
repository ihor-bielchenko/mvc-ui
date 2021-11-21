
export const METHOD_TYPE_GET = {
	id: process.env.METHOD_TYPE_GET,
	name: 'GET',
	text: () => 'получить',
	backgroundColor: '#1976d2',
	textColor: '#FFF',
};
export const METHOD_TYPE_POST = {
	id: process.env.METHOD_TYPE_POST,
	name: 'POST',
	text: () => 'создать',
	backgroundColor: '#4caf50',
	textColor: '#FFF',
};
export const METHOD_TYPE_PUT = {
	id: process.env.METHOD_TYPE_PUT,
	name: 'PUT',
	text: () => 'перезаписать',
	backgroundColor: '#ff9800',
	textColor: '#FFF',
};
export const METHOD_TYPE_PATCH = {
	id: process.env.METHOD_TYPE_PATCH,
	name: 'PATCH',
	text: () => 'обновить',
	backgroundColor: '#9c27b0',
	textColor: '#FFF',
};
export const METHOD_TYPE_DELETE = {
	id: process.env.METHOD_TYPE_DELETE,
	name: 'DELETE',
	text: () => 'удалить',
	backgroundColor: '#f44336',
	textColor: '#FFF',
};

const method = {
	[process.env.METHOD_TYPE_GET]: METHOD_TYPE_GET,
	[process.env.METHOD_TYPE_POST]: METHOD_TYPE_POST,
	[process.env.METHOD_TYPE_PUT]: METHOD_TYPE_PUT,
	[process.env.METHOD_TYPE_PATCH]: METHOD_TYPE_PATCH,
	[process.env.METHOD_TYPE_DELETE]: METHOD_TYPE_DELETE,
};

export default method;
