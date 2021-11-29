import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/func.js';
import { 
	DIALOG_FUNC,
	DIALOG_IF, 
} from 'consts/dialog.js';

const onClose = (e, workspaceId) => {
	const script = Store().getState().script;

	script[workspaceId].loadedFlag = true;
	Store().dispatch({
		type: 'func',
		payload: () => initialState(),
	});
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
	onCloseDialog(DIALOG_FUNC)(e);
	onCloseDialog(DIALOG_IF)(e);
};

export default onClose;
