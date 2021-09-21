import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_ARROW } from 'consts/url.js';

const arrowAll = async (scriptId) => {
	try {
		const r = await axios(process.env.CORE_PATH + URL_API_CORE_ARROW, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				filter: {
					script_id: scriptId,
				}
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await arrowAll(scriptId));
	}
};

export default arrowAll;

