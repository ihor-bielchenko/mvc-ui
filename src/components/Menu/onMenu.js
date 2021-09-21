import Store from 'components/Store';

let _timeout;
const _onMenu = (e, aria, options = '', name) => {
	const currentTarget = e.currentTarget;

	clearTimeout(_timeout);
	if (aria) {
		_timeout = setTimeout(() => {
			const menu = Store().getState().menu;
			let label = '',
				scriptId;

			if (typeof options === 'string') {
				label = options;
			}
			else if (typeof options === 'object') {
				label = options.label || '';
				scriptId = options.scriptId;
			}

			menu[aria] = {
				...menu[aria],
				anchorEl: currentTarget,
				label,
				name,
				scriptId,
			};
			Store().dispatch({
				type: 'menu',
				payload: () => menu,
			});
		}, 0);
	}
};
const onMenu = (aria, options) => (e, name) => _onMenu(e, aria, options, name);

export default onMenu;
