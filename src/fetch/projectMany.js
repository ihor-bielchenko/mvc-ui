import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT } from 'consts/url.js';

const projectMany = async () => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				limit: 999,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await projectMany());
	}
};

export default projectMany;

