import Store from 'components/Store';
import onClose from 'components/Menu/onClose.js';

let _timeout;
const onDialog = (name = '', body = {}, dontHideMenu = false) => () => {
	if (!dontHideMenu) {
		onClose();
	}
	clearTimeout(_timeout);
	_timeout = setTimeout(() => {
		const dialogs = Store().getState().dialogs;

		dialogs[name] = body;
		Store().dispatch({
			type: 'dialogs',
			payload: () => dialogs,
		});
	}, 0);
};

export default onDialog;
