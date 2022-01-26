import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SSO_USER } from 'consts/url.js';

const accountUpdate = async (data) => {
	try {
		const r = await axios(process.env.SSO_PATH + URL_API_SSO_USER, {
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
		return await forbidden(err, async () => await accountUpdate(data));
	}
};

export default accountUpdate;

