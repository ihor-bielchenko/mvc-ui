import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT_ROUTE } from 'consts/url.js';

const routeDelete = async (ids) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT_ROUTE, {
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
		return await forbidden(err, async () => await routeDelete(ids));
	}
};

export default routeDelete;
