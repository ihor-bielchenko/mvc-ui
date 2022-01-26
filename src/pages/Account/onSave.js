import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import axiosError from 'utils/axiosError.js';
import fetchAccountUpdate from 'fetch/accountUpdate.js';

const onSave = async (e) =>  {

	let account = Store().getState().account;

	onLoader(true);
	account.editFlag = false;

	try {

		const fetchAccountResponse = await fetchAccountUpdate( account );
		const fetchAccountData = ((fetchAccountResponse || {}).data || {}).data || {};

		account = {
			...fetchAccountData
		};

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
	};
	onLoader(false);
};




export default onSave;