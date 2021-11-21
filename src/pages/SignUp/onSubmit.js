import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import fetchSignUp from 'fetch/signUp.js';
import axiosError from 'utils/axiosError.js';
import { passwordCheck } from 'utils/validators.js';
import { URL_PAGE_ACCESS_CONFIRM } from 'consts/url.js';

const onSubmit = async (e, setState, recaptchaRef, locationPush) => {
	e.preventDefault();

	const email = e.currentTarget.elements.email.value;
	const name = e.currentTarget.elements.name.value;
	const password = e.currentTarget.elements.password.value;
	const confirmPassword = e.currentTarget.elements.confirm_password.value;

	try {
		passwordCheck(password);
	}
	catch (err) {
		return setState((currentState) => {
			return {
				...currentState,
				password: err.message,
			};
		});
	}

	if (password !== confirmPassword) {
		return setState((currentState) => {
			return {
				...currentState,
				password: 'ErrorValidationEqualPassword',
			};
		});
	}

	if (!recaptchaRef.current.getValue()) {
		return setState((currentState) => {
			return {
				...currentState,
				password: 'ErrorValidationRecaptcha',
			};
		});
	}
	onLoader(true);

	try {
		await fetchSignUp({
			email,
			name,
			password,
			confirm_password: confirmPassword,
		});
		setTimeout(() => {
			locationPush(URL_PAGE_ACCESS_CONFIRM);
		}, 100);
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
	}
	setTimeout(() => {
		onLoader(false);
	}, 100);
};

export default onSubmit;
