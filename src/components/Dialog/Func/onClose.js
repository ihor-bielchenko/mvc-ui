import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/func.js';
import { DIALOG_FUNC } from 'consts/dialog.js';

const onClose = (e) => {
	Store().dispatch({
		type: 'func',
		payload: () => initialState(),
	});
	onCloseDialog(DIALOG_FUNC)(e);
};

export default onClose;
