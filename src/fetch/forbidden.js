import axios from 'axios';
import { 
	URL_PAGE_SIGN_IN,
	URL_API_SSO_REFRESH, 
} from 'consts/url.js';

const forbidden = async (err, callback) => {
	const status = (err.response || {}).status;

	if (status === 403) {
		try {
			const response = await axios(process.env.SSO_PATH + URL_API_SSO_REFRESH, {
				method: 'get',
				params: {
					access_token: localStorage.getItem('access_token'),
					refresh_token: localStorage.getItem('refresh_token'),
				},
			});
			const {
				access_token,
				refresh_token,
			} = (response.data || {}).data || {};

			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);

			if (typeof callback === 'function') {
				return await callback();
			}
		}
		catch (err) {
			if (typeof err.response === 'object' && 
				err.response.status === 401) {
				return window.location = URL_PAGE_SIGN_IN;
			}
			else {
				throw err;
			}
		}
	}
	else if (status === 401) {
		return window.location = URL_PAGE_SIGN_IN;
	}

	throw err;
};

export default forbidden;
