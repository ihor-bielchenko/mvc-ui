import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_JSON } from 'consts/url.js';

const jsonUpdate = async (id, data) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_JSON +'/'+ id, {
			method: 'patch',
			params: {
				access_token: localStorage.getItem('access_token'),
				...data,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await jsonUpdate(id, data));
	}
};

export default jsonUpdate;
