
export const SERVICE_TEMPLATE_BASE = {
	id: process.env.SERVICE_TEMPLATE_BASE,
	text: () => 'По умолчанию',
};
export const SERVICE_TEMPLATE_COMMERCE = {
	id: process.env.SERVICE_TEMPLATE_COMMERCE,
	text: () => 'Коммуникация',
};
export const SERVICE_TEMPLATE_MESSAGE = {
	id: process.env.SERVICE_TEMPLATE_MESSAGE,
	text: () => 'Коммерция',
};
export const SERVICE_TEMPLATE_DISK = {
	id: process.env.SERVICE_TEMPLATE_DISK,
	text: () => 'Файлы',
};

const serviceTemplates = {
	[process.env.SERVICE_TEMPLATE_BASE]: SERVICE_TEMPLATE_BASE,
	[process.env.SERVICE_TEMPLATE_COMMERCE]: SERVICE_TEMPLATE_COMMERCE,
	[process.env.SERVICE_TEMPLATE_MESSAGE]: SERVICE_TEMPLATE_MESSAGE,
	[process.env.SERVICE_TEMPLATE_DISK]: SERVICE_TEMPLATE_DISK,
};

export default serviceTemplates;