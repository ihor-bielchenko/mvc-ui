import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT_ROUTE } from 'consts/url.js';

const routeMany = async (page, data = {}) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT_ROUTE +'?page='+ page, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				...data,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await routeMany(page, data));
	}
};

export default routeMany;

