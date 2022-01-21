import * as func from './func.js';
import * as operatorIf from './operatorIf.js';
import * as operatorJoin from './operatorJoin.js';
import * as cmpApi from './cmpApi.js';


const lang =  () => ({
	...func,
	...operatorIf,
	...operatorJoin,
	...cmpApi,

	
});

export default lang;
