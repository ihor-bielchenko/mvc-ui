import Store from 'components/Store';
import fetchRefreshJWT from 'fetch/refreshJWT.js';
import onLoader from 'components/Loader/onLoader.js';
import axiosError from 'utils/axiosError.js';

let _timouout;
const refreshJWTTimeout = () => {
	clearTimeout(_timouout);
	_timouout = setTimeout(async () => {
		try {
			const response = await fetchRefreshJWT();
			const {
				access_token,
				refresh_token,
			} = ((response.data || {}).data || {});

			localStorage.setItem('access_token', access_token);
			localStorage.setItem('refresh_token', refresh_token);

			refreshJWTTimeout();
		}
		catch (err) {
			Store().dispatch({
				type: 'alert',
				payload: () => ({
					flag: true,
					message: axiosError(err),
					vertical: 'bottom',
					horizontal: 'right',
				}),
			});
			onLoader(false);
		}
	}, 60000);
};

export default refreshJWTTimeout;
