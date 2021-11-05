import Store from 'components/Store';
import onCloseDialog from '../onClose.js';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';

const onClose = (e) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.query
		&& jsObject.tempValue.query[0]) {
		delete jsObject.tempValue.query[0];
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
	onCloseDialog(DIALOG_DB_QUERY)(e);
};

export default onClose;
