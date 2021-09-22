import Store from 'components/Store';
import onClose from 'components/Menu/onClose.js';

const onDialog = (name = '', body = {}, dontHideMenu = false) => () => {
	if (!dontHideMenu) {
		onClose();
	}
	const dialogs = Store().getState().dialogs;

	dialogs[name] = body;
	Store().dispatch({
		type: 'dialogs',
		payload: () => dialogs,
	});
};

export default onDialog;
