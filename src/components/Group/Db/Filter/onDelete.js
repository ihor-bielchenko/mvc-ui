import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const onDelete = (id) => () => {
	const jsObject = Store().getState().jsObject;

	if ((jsObject.tempValue.filter || {})[id]) {
		delete jsObject.tempValue.filter[id];
		delete jsObject.filterFormId;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(DIALOG_DELETE_CONFIRM)();
	}
};

export default onDelete;
