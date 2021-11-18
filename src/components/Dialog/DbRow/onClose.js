import onCloseDialog from '../onClose.js';
import onUnmount from './onUnmount.js';
import { DIALOG_DB_ROW } from 'consts/dialog.js';

const onClose = (e) => {
	onUnmount();
	onCloseDialog(DIALOG_DB_ROW)(e);
};

export default onClose;
