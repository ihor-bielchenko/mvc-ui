import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_ROW } from 'consts/url.js';

const dbRowCreate = async (tableId, data) => {
	try {
		const r = await axios(process.env.DB_PATH + URL_API_DB_ROW +'/'+ tableId, {
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
		return await forbidden(err, async () => await dbRowCreate(tableId, data));
	}
};

export default dbRowCreate;
