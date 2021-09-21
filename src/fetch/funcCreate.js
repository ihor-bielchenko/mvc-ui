import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_FUNC } from 'consts/url.js';

const funcCreate = async (data) => {
	try {
		const r = await axios(process.env.LOGIC_PATH + URL_API_CORE_FUNC, {
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
		return await forbidden(err, async () => await funcCreate(data));
	}
};

export default funcCreate;
