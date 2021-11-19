import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT_SERVICE } from 'consts/url.js';

const serviceUpdate = async (id, data) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT_SERVICE +'/'+ id, {
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
		return await forbidden(err, async () => await serviceUpdate(id, data));
	}
};

export default serviceUpdate;
