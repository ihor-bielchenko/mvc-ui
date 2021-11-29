import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/prop.js';
import { DIALOG_PROP } from 'consts/dialog.js';

const onClose = (e, workspaceId) => {
	const {
		script,
		services,
		routes,
	} = Store().getState();

	script[workspaceId].loadedFlag = true;
	services.data = [];
	routes.data = [];
	delete routes.fetch;
	Store().dispatch({
		type: 'prop',
		payload: () => initialState(),
	});
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
	Store().dispatch({
		type: 'services',
		payload: () => ({ ...services }),
	});
	Store().dispatch({
		type: 'routes',
		payload: () => ({ ...routes }),
	});
	onCloseDialog(DIALOG_PROP)(e);
};

export default onClose;
