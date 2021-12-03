import Store from 'components/Store';
import { initialState as initialStateAccount } from 'components/Store/account.js';

const onExit = (e) => {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');

	Store().dispatch({
		type: 'account',
		payload: () => {
			setTimeout(() => {
				window.location.href = '/';
			}, 100);

			return initialStateAccount();
		},
	});
};

export default onExit;
