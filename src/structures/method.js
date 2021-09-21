
export const METHOD_GET = {
	id: process.env.METHOD_GET,
	name: 'GET',
	description: 'получение',
	backgroundColor: '#1976d2',
	textColor: '#FFF',
};
export const METHOD_POST = {
	id: process.env.METHOD_POST,
	name: 'POST',
	description: 'создание',
	backgroundColor: '#4caf50',
	textColor: '#FFF',
};
export const METHOD_PUT = {
	id: process.env.METHOD_PUT,
	name: 'PUT',
	description: 'перезапись',
	backgroundColor: '#ff9800',
	textColor: '#FFF',
};
export const METHOD_PATCH = {
	id: process.env.METHOD_PATCH,
	name: 'PATCH',
	description: 'обновление',
	backgroundColor: '#9c27b0',
	textColor: '#FFF',
};
export const METHOD_DELETE = {
	id: process.env.METHOD_DELETE,
	name: 'DELETE',
	description: 'удаление',
	backgroundColor: '#f44336',
	textColor: '#FFF',
};

const method = {
	[process.env.METHOD_GET]: METHOD_GET,
	[process.env.METHOD_POST]: METHOD_POST,
	[process.env.METHOD_PUT]: METHOD_PUT,
	[process.env.METHOD_PATCH]: METHOD_PATCH,
	[process.env.METHOD_DELETE]: METHOD_DELETE,
};

export default method;
