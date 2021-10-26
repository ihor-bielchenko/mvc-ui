import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_PROP } from 'consts/url.js';

const propCreate = async (data) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_PROP, {
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
		return await forbidden(err, async () => await propCreate(data));
	}
};

export default propCreate;
