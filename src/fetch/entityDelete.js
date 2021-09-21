import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_ENTITY } from 'consts/url.js';

const entityDelete = async (ids) => {
	try {
		const r = await axios(process.env.LOGIC_PATH + URL_API_CORE_ENTITY, {
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
		return await forbidden(err, async () => await entityDelete(ids));
	}
};

export default entityDelete;
