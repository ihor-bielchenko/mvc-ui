import funcIf from './funcIf.js';
import funcText from './funcText.js';
import funcMaths from './funcMaths.js';
import funcArr from './funcArr.js';
import funcObj from './funcObj.js';
import funcDb from './funcDb.js';
import funcTime from './funcTime.js';
import funcHash from './funcHash.js';
import funcServer from './funcServer.js';

const funcTemplates = {
	...funcIf,
	...funcText,
	...funcMaths,
	...funcArr,
	...funcObj,
	...funcDb,
	...funcTime,
	...funcHash,
	...funcServer,
};

export default funcTemplates;
