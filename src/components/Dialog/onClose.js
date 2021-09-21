import Store from 'components/Store';

const onClose = (name) => (e, reason = '') => {
	return reason === 'clickaway'
		? true
		: (() => {
			const dialogs = Store().getState().dialogs;

			if (dialogs[name]) {
				delete dialogs[name];
				Store().dispatch({
					type: 'dialogs',
					payload: () => ({ ...dialogs }),
				});
			}
			else if (!name) {
				Store().dispatch({
					type: 'dialogs',
					payload: () => ({}),
				});
			}
		})();
};

export default onClose;

