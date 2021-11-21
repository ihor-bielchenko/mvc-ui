
const getScriptId = () => Number(window
	.location
	.pathname
	.split('/')[7]);

export default getScriptId;
