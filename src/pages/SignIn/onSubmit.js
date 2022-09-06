import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import fetchSignIn from 'fetch/signIn.js';
// import axiosError from 'utils/axiosError.js';
import { URL_PAGE_DASHBOARD } from 'consts/url.js';
import { getLang } from 'components/Language';

const onSubmit = async (e, locationPush) => {
	e.preventDefault();
	onLoader(true);

	const email = e.currentTarget.elements.email.value;
	const password = e.currentTarget.elements.password.value;
	const remember = e.currentTarget.elements.remember.checked;

	try {
		const response = await fetchSignIn({
			email,
			password,
			remember: remember
				? 'on'
				: 'off',
		});
		const {
			user,
			access_token,
			refresh_token,
		} = ((response.data || {}).data || {});

		Store().dispatch({
			type: 'account',
			payload: () => {
				localStorage.setItem('access_token', access_token);
				localStorage.setItem('refresh_token', refresh_token);
				user['path'] = user.unique_name +'.client.drivedatum.com';
				setTimeout(() => locationPush('/'+ URL_PAGE_DASHBOARD), 0);
				return user;
			},
		});
	}
	catch (err) {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: true,
				message: getLang('SignInErrorText'),
				vertical: 'bottom',
				horizontal: 'right',
			}),
		});
	}
	onLoader(false);
};

export default onSubmit;
