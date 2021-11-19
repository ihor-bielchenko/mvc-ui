import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_PROJECT } from 'consts/url.js';

const projectUpdate = async (tableId, data) => {
	try {
		const r = await axios(process.env.PROJECT_PATH + URL_API_PROJECT +'/'+ tableId, {
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
		return await forbidden(err, async () => await projectUpdate(tableId, data));
	}
};

export default projectUpdate;
