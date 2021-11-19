import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import onClose from 'components/Dialog/onClose.js';
import fetchProjectDelete from 'fetch/projectDelete.js';
import axiosError from 'utils/axiosError.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onMount from '../onMount.js';

const onDelete = async (e, projectId) => {
	onLoader(true);

	try {
		if (projectId > 0) {
			await fetchProjectDelete(JSON.stringify([ projectId ]));
			await onMount();

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
