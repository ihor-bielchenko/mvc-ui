import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import onClose from 'components/Dialog/onClose.js';
import fetchRouteDelete from 'fetch/routeDelete.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onMount from './onMount.js';

const onDelete = (routeId) => async (e) => {
	onLoader(true);

	try {
		const list = Store().getState().list;

		await fetchRouteDelete(JSON.stringify(routeId > 0
			? ([ routeId ])
			: list.select));
		list.select = [];
		list.search.query = '';
		await onMount();
		onClose(DIALOG_DELETE_CONFIRM)(e);
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
