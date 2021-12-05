import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_ENGINE_DOWNLOAD } from 'consts/url.js';

const buildDownloadCreate = async (data) => {
	try {
		const r = await axios(process.env.ENGINE_PATH + URL_API_ENGINE_DOWNLOAD, {
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
		return await forbidden(err, async () => await buildDownloadCreate(data));
	}
};

export default buildDownloadCreate;
