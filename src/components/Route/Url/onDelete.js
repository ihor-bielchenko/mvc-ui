import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const onDelete = (e, index) => {
	const routes = Store().getState().routes;

	if (typeof routes.form.url[index] === 'object') {
		routes.form.url.splice(index, 1);
		Store().dispatch({
			type: 'routes',
			payload: () => ({ ...routes }),
		});
	}
	onClose(DIALOG_DELETE_CONFIRM)();
};

export default onDelete;
