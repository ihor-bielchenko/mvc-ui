
const getScriptId = () => Number(window
	.location
	.pathname
	.split('/')[3]);

export default getScriptId;
