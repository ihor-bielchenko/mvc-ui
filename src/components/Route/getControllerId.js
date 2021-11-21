
const getControllerId = () => Number(window
	.location
	.pathname
	.split('/')[5]);

export default getControllerId;
