import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_TABLE } from 'consts/url.js';

const dbTableUpdate = async (tableId, data) => {
	try {
		if (typeof data.is_collection !== 'undefined') {
			data.is_collection = Number(data.is_collection);
		}
		const r = await axios(process.env.DB_PATH + URL_API_DB_TABLE +'/'+ tableId, {
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
		return await forbidden(err, async () => await dbTableUpdate(tableId, data));
	}
};

export default dbTableUpdate;
