import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import onClose from 'components/Dialog/onClose.js';
import getProjectId from 'components/Service/getProjectId.js';
import getServiceId from 'components/Service/getServiceId.js';
import fetchRouteDelete from 'fetch/routeDelete.js';
import axiosError from 'utils/axiosError.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import { 
	URL_PAGE_SERVICE,
	URL_PAGE_API, 
} from 'consts/url.js';

const onDelete = async (e, historyPush = () => {}) => {
	onLoader(true);

	try {
		const routes = Store().getState().routes;
		const serviceId = getServiceId();
		const projectId = getProjectId();

		if (routes.form.id > 0) {
			await fetchRouteDelete(JSON.stringify([ routes.form.id ]));

			historyPush(`/${projectId}/${URL_PAGE_SERVICE}/${serviceId}/${URL_PAGE_API}`);
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
