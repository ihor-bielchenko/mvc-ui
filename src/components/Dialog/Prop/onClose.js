import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/prop.js';
import { DIALOG_PROP } from 'consts/dialog.js';

const onClose = (e, workspaceId) => {
	const script = Store().getState().script;

	script[workspaceId].loadedFlag = true;
	script.editEntityIndex = undefined;
	Store().dispatch({
		type: 'prop',
		payload: () => initialState(),
	});
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
	onCloseDialog(DIALOG_PROP)(e);
};

export default onClose;
