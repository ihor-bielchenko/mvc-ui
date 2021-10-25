import Store from 'components/Store';

let timeout;
const onLoader = (flag, opacity = .6) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		const config = Store().getState().config;
		
		config.loaderFlag = Boolean(flag);
		config.loaderOpacity = Number(opacity);
		Store().dispatch({
			type: 'config',
			payload: () => ({ ...config }),
		});
	}, 0);
};

export default onLoader;
