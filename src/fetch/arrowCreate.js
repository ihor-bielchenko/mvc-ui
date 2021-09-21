import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_ARROW } from 'consts/url.js';

const arrowCreate = async (data) => {
	try {
		const r = await axios(process.env.LOGIC_PATH + URL_API_CORE_ARROW, {
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
		return await forbidden(err, async () => await arrowCreate(data));
	}
};

export default arrowCreate;
