import onCloseDialog from 'components/Dialog/onClose.js';
import { DIALOG_JSON } from 'consts/dialog.js';

const onClose = (e) => {
	onCloseDialog(DIALOG_JSON)(e);
};

export default onClose;
