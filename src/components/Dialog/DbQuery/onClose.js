import onCloseDialog from '../onClose.js';
import { DIALOG_DB_QUERY } from 'consts/dialog.js';

const onClose = (e, setLogicValue = () => {}) => {
	setLogicValue(undefined);
	onCloseDialog(DIALOG_DB_QUERY)(e);
};

export default onClose;
