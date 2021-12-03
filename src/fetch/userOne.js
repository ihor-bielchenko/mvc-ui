import axios from 'axios';
import forbidden from './forbidden.js';
import { URL_API_SSO_USER } from 'consts/url.js';

const userOne = async () => {
	try {
		const r = await axios(process.env.SSO_PATH + URL_API_SSO_USER, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				refresh_token: localStorage.getItem('refresh_token'),
			},
		});

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await userOne());
	}
};

export default userOne;
