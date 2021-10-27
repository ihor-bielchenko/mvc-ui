import Store from 'components/Store';

const onClose = (e, aria) => {
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
		payload: () => ({ ...menu }),
	});
};

export default onClose;
