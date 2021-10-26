import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SOURCE_CORTEGE } from 'consts/url.js';

const cortegeCreateOne = async (data) => {
	try {
		const r = await axios(process.env.SOURCE_PATH + URL_API_SOURCE_CORTEGE +'/one', {
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
		return await forbidden(err, async () => await cortegeCreateOne(data));
	}
};

export default cortegeCreateOne;
