import Store from 'components/Store';

const onLoader = (flag, opacity = .6) => {
	const config = Store().getState().config;
	
	config.loaderQueue = Boolean(flag)
		? (config.loaderQueue + 1)
		: (config.loaderQueue > 0)
			? (config.loaderQueue - 1)
			: 0;
	config.loaderOpacity = Number(opacity);
	Store().dispatch({
		type: 'config',
		payload: () => ({ ...config }),
	});
};

export default onLoader;
