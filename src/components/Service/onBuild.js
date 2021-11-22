import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_BUILD } from 'consts/dialog.js';

const onBuild = (e) => {
	console.log('--');
	onDialog(DIALOG_BUILD)(e);
};

export default onBuild;
