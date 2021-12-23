import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT_SERVICE } from 'consts/url.js';

const serviceDelete = async (ids) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT_SERVICE, {
			method: 'delete',
			params: {
				access_token: localStorage.getItem('access_token'),
				ids: JSON.stringify(ids),
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await serviceDelete(ids));
	}
};

export default serviceDelete;
