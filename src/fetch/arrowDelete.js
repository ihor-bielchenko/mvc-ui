import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_ARROW } from 'consts/url.js';

const arrowDelete = async (ids) => {
	try {
		const r = await axios(process.env.CORE_PATH + URL_API_CORE_ARROW, {
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
		return await forbidden(err, async () => await arrowDelete(ids));
	}
};

export default arrowDelete;
