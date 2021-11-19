
const getProjectId = () => Number(window
	.location
	.pathname
	.split('/')[1]);

export default getProjectId;
