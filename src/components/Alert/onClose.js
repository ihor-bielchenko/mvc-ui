import Store from 'components/Store';

let timeout;
const onClose = (time = 0) => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: false,
				message: '',
			}),
		});
	}, time);
};

export default onClose;
