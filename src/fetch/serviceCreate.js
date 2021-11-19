import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT_SERVICE } from 'consts/url.js';

const serviceCreate = async (data) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT_SERVICE, {
			method: 'post',
			params: {
				access_token: localStorage.getItem('access_token'),
				...data,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await serviceCreate(data));
	}
};

export default serviceCreate;
