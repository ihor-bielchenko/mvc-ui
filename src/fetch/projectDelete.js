import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT } from 'consts/url.js';

const projectDelete = async (ids) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT, {
			method: 'delete',
			params: {
				access_token: localStorage.getItem('access_token'),
				ids,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await projectDelete(ids));
	}
};

export default projectDelete;
