import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_ENTITY } from 'consts/url.js';

const entityUpdate = async (id, data) => {
	try {
		const r = await axios(process.env.LOGIC_PATH + URL_API_CORE_ENTITY +'/'+ id, {
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
		return await forbidden(err, async () => await entityUpdate(id, data));
	}
};

export default entityUpdate;
