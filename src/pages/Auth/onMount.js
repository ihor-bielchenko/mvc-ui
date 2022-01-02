import Store from 'components/Store';
import axiosError from 'utils/axiosError.js';
import fetchUserOne from 'fetch/userOne.js';

const onMount = async () => {
	try {
		const account = Store().getState().account;
		const fetchResponse = await fetchUserOne();
		const fetchData = (fetchResponse.data || {});

		account.avatar = fetchData.avatar;
		account.email = fetchData.email;
		account.name = fetchData.name;
		account.unique_name = fetchData.unique_name;
		account.tariff_id = fetchData.tariff_id;
		account.path = account.unique_name +'.client.drivedatum.com';

		Store().dispatch({
			type: 'account',
			payload: () => ({ ...account }),
		});
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
};

export default onMount;
