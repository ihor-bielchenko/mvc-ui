import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_FUNC } from 'consts/url.js';

const funcOne = async (id) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_FUNC +'/'+ id, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await funcOne(id));
	}
};

export default funcOne;

