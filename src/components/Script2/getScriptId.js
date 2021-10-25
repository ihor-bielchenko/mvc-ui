
const getScriptId = () => Number(window
	.location
	.pathname
	.split('/')[2]);

export default getScriptId;
