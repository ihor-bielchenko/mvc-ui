import Store from 'components/Store';

let timeout;
const onClose = (e, aria) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		let menu = Store().getState().menu;

		if (aria && menu[aria]) {
			menu[aria].anchorEl = null;
			menu[aria].value = '';
			menu[aria].label = '';
		}
		else {
			menu = {};
		}

		Store().dispatch({
			type: 'menu',
			payload: () => menu,
		});
	}, 0);
};

export default onClose;
