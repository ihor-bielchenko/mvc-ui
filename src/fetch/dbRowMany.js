import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_ROW } from 'consts/url.js';

const dbRowMany = async (page, data = {}) => {
	try {
		const r = await axios(process.env.DB_PATH + URL_API_DB_ROW +'?page='+ page, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				...data,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await dbRowMany(page, data));
	}
};

export default dbRowMany;

