import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const onDelete = (id) => () => {
	const jsObject = Store().getState().jsObject;

	if ((jsObject.tempValue.sort || {})[id]) {
		delete jsObject.tempValue.sort[id];
		delete jsObject.sortFormId;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(DIALOG_DELETE_CONFIRM)();
	}
};

export default onDelete;
