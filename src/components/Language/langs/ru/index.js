import * as func from './func.js';
import * as operatorIf from './operatorIf.js';
import * as operatorJoin from './operatorJoin.js';

const lang =  () => ({
	...func,
	...operatorIf,
	...operatorJoin,
});

export default lang;
