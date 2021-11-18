import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_COLUMN } from 'consts/url.js';

const dbColumnCreate = async (data) => {
	try {
		const r = await axios(process.env.DB_PATH + URL_API_DB_COLUMN, {
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
		return await forbidden(err, async () => await dbColumnCreate(data));
	}
};

export default dbColumnCreate;
