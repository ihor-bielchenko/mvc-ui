import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_JSON } from 'consts/url.js';

const jsonOne = async (id) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_JSON +'/'+ id, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await jsonOne(id));
	}
};

export default jsonOne;

