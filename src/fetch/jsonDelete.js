import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_JSON } from 'consts/url.js';

const jsonDelete = async (ids) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_JSON, {
			method: 'delete',
			params: {
				access_token: localStorage.getItem('access_token'),
				ids,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await jsonDelete(ids));
	}
};

export default jsonDelete;
