import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_OBJECT_CORTEGE } from 'consts/url.js';

const cortegeDelete = async (ids) => {
	try {
		const r = await axios(process.env.OBJECT_PATH + URL_API_OBJECT_CORTEGE, {
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
		return await forbidden(err, async () => await cortegeDelete(ids));
	}
};

export default cortegeDelete;
