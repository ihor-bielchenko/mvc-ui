import Store from 'components/Store';

const onLoader = (flag, opacity = .6) => {
	const config = Store().getState().config;
		
	config.loaderFlag = Boolean(flag);
	config.loaderOpacity = Number(opacity);
	Store().dispatch({
		type: 'config',
		payload: () => ({ ...config }),
	});
};

export default onLoader;
