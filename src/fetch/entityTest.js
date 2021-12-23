import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SCRIPT_ENTITY } from 'consts/url.js';

const entityTest = async (id, data) => {
	try {
		const r = await axios(process.env.SCRIPT_PATH + URL_API_SCRIPT_ENTITY +'/test/'+ id, {
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
		return await forbidden(err, async () => await entityTest(id, data));
	}
};

export default entityTest;
