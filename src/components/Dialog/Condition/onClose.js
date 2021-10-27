import Store from 'components/Store';
import onCloseDialog from 'components/Dialog/onClose.js';
import { initialState } from 'components/Store/func.js';
import { DIALOG_IF } from 'consts/dialog.js';

const onClose = (e) => {
	Store().dispatch({
		type: 'func',
		payload: () => initialState(),
	});
	onCloseDialog(DIALOG_IF)(e);
};

export default onClose;
