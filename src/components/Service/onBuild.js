import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_BUILD } from 'consts/dialog.js';

const onBuild = (e) => {
	onDialog(DIALOG_BUILD)(e);
};

export default onBuild;
