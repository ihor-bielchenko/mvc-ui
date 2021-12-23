import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import onClose from 'components/Dialog/onClose.js';
import fetchServiceDelete from 'fetch/serviceDelete.js';
import axiosError from 'utils/axiosError.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { URL_PAGE_DASHBOARD } from 'consts/url.js';

const onDelete = async (e, historyPush) => {
	onLoader(true);

	try {
		const services = Store().getState().services;

		if (services.form.id > 0) {
			await fetchServiceDelete([ services.form.id ]);

			historyPush(`/${URL_PAGE_DASHBOARD}`);
			onClose(DIALOG_DELETE_CONFIRM)(e);
		}
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
	onLoader(false);
};

export default onDelete;
