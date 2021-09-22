import Store from 'components/Store';

const _onMenu = (e, aria, options = '', name) => {
	const currentTarget = e.currentTarget;

	if (aria) {
		const menu = Store().getState().menu;
		
		if (typeof options === 'string') {
			menu[aria] = {
				...menu[aria],
				anchorEl: currentTarget,
				label: options,
				name,
			};
		}
		else if (typeof options === 'object') {
			menu[aria] = {
				...options,
				...menu[aria],
				anchorEl: currentTarget,
				name,
			};
		}
		Store().dispatch({
			type: 'menu',
			payload: () => ({ ...menu }),
		});
	}
};
const onMenu = (aria, options) => (e, name) => _onMenu(e, aria, options, name);

export default onMenu;
