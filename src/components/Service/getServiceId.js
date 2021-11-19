
const getServiceId = () => Number(window
	.location
	.pathname
	.split('/')[3]);

export default getServiceId;
