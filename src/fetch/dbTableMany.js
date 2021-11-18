import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_DB_TABLE } from 'consts/url.js';

const dbTableMany = async (serviceId) => {
	try {
		const r = await axios(process.env.DB_PATH + URL_API_DB_TABLE, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
				filter: '{"service_id":'+ serviceId +'}',
				limit: 999,
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await dbTableMany(serviceId));
	}
};

export default dbTableMany;

