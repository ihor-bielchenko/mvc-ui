import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_ROW } from 'consts/url.js';

const dbRowUpdate = async (id, tableId, data) => {
	try {
		const r = await axios(process.env.DB_PATH + URL_API_DB_ROW +'/'+ id, {
			method: 'patch',
			params: {
				access_token: localStorage.getItem('access_token'),
				table_id: tableId,
				...data,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await dbRowUpdate(id, tableId, data));
	}
};

export default dbRowUpdate;
