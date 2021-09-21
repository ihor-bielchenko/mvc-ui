import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/prop.js';
import { DIALOG_PROP } from 'consts/dialog.js';

const onClose = (e) => {
	Store().dispatch({
		type: 'prop',
		payload: () => initialState(),
	});
	onCloseDialog(DIALOG_PROP)(e);
};

export default onClose;
