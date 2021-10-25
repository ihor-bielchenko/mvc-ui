import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_OBJECT_CORTEGE } from 'consts/url.js';

const cortegeGetMany = async (id) => {
	try {
		const r = await axios(process.env.OBJECT_PATH + URL_API_OBJECT_CORTEGE +'/'+ id, {
			method: 'get',
			params: {
				access_token: localStorage.getItem('access_token'),
			},
		});
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await cortegeGetMany(id));
	}
};

export default cortegeGetMany;
