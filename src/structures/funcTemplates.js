import funcIfDefault from './funcIf.js';
import funcTextDefault from './funcText.js';
import funcMathsDefault from './funcMaths.js';
import funcArrDefault from './funcArr.js';
import funcObjDefault from './funcObj.js';
import funcDbDefault from './funcDb.js';
import funcTimeDefault from './funcTime.js';
import funcHashDefault from './funcHash.js';
import funcServerDefault from './funcServer.js';
import * as funcIf from './funcIf.js';
import * as funcText from './funcText.js';
import * as funcMaths from './funcMaths.js';
import * as funcArr from './funcArr.js';
import * as funcObj from './funcObj.js';
import * as funcDb from './funcDb.js';
import * as funcTime from './funcTime.js';
import * as funcHash from './funcHash.js';
import * as funcServer from './funcServer.js';

const funcTemplatesDefault = {
	...funcIfDefault,
	...funcTextDefault,
	...funcMathsDefault,
	...funcArrDefault,
	...funcObjDefault,
	...funcDbDefault,
	...funcTimeDefault,
	...funcHashDefault,
	...funcServerDefault,
};
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

export default funcTemplatesDefault;
export { 
	funcTemplates 
};
