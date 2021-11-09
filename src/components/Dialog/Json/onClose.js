import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/json.js';
import { DIALOG_JSON } from 'consts/dialog.js';

const onClose = (e, workspaceId) => {
	const script = Store().getState().script;

	script[workspaceId].loadedFlag = true;
	script.editEntityIndex = undefined;
	Store().dispatch({
		type: 'json',
		payload: () => initialState(),
	});
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
	onCloseDialog(DIALOG_JSON)(e);
};

export default onClose;
