import Store from 'components/Store';
import { setFunc } from 'components/Store/func.js';
import onCloseDialog from 'components/Dialog/onClose.js';
import { DIALOG_FUNC } from 'consts/dialog.js';

const onClose = (e) => {
	Store().dispatch({
		type: 'func',
		payload: () => setFunc(),
	});
	onCloseDialog(DIALOG_FUNC)(e);
};

export default onClose;
