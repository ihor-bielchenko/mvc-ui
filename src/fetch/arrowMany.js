import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_ARROW } from 'consts/url.js';

const arrowMany = async (id) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_ARROW, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				filter: '{"script_id":"'+ id +'"}',
				limit: 999,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await arrowMany(id));
	}
};

export default arrowMany;

