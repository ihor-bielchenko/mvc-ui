import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_SCRIPT } from 'consts/url.js';

const scriptOne = async (id) => {
	try {
		const r = await axios(process.env.CORE_PATH + URL_API_CORE_SCRIPT +'/'+ id, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await scriptOne(id));
	}
};

export default scriptOne;
