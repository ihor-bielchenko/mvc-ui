import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_CORE_FUNC } from 'consts/url.js';

const funcUpdate = async (id, data) => {
	try {
		const r = await axios(process.env.LOGIC_PATH + URL_API_CORE_FUNC +'/'+ id, {
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
		return await forbidden(err, async () => await funcUpdate(id, data));
	}
};

export default funcUpdate;
