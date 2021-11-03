import Store from 'components/Store';

const _onMenu = (e, aria, options = '', id) => {
	const currentTarget = e.currentTarget;

	if (aria) {
		const menu = Store().getState().menu;
		
		if (typeof options === 'string') {
			menu[aria] = {
				...menu[aria],
				anchorEl: currentTarget,
				label: options,
				id,
			};
		}
		else if (typeof options === 'object') {
			menu[aria] = {
				...options,
				...menu[aria],
				anchorEl: currentTarget,
				id,
			};
		}
		Store().dispatch({
			type: 'menu',
			payload: () => ({ ...menu }),
		});
	}
};
const onMenu = (aria, options) => (e, id) => _onMenu(e, aria, options, id);

export default onMenu;
