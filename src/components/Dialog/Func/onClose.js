import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/json.js';
import { DIALOG_JSON } from 'consts/dialog.js';

const onClose = (e) => {
	Store().dispatch({
		type: 'json',
		payload: () => initialState(),
	});
	onCloseDialog(DIALOG_JSON)(e);
};

export default onClose;
