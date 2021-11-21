
const getRouteId = () => Number(window
	.location
	.pathname
	.split('/')[5]);

export default getRouteId;
