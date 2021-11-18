import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_ROW } from 'consts/url.js';

const dbRowDelete = async (ids) => {
	try {
		const r = await axios(process.env.DB_PATH + URL_API_DB_ROW, {
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
		return await forbidden(err, async () => await dbRowDelete(ids));
	}
};

export default dbRowDelete;
