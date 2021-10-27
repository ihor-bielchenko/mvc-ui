import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchFuncOne from 'fetch/funcOne.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (id) => {
	const func = Store().getState().func;

	onLoader(true);

	try {
		const response = await fetchFuncOne(id);
		const data = ((response || {}).data || {}).data || {};
		
		func.id = id;
		func.name = data.name;
		func.template_id = data.template_id;

		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
		onLoader(false);
	}
	catch (err) {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: true,
				message: axiosError(err),
				vertical: 'bottom',
				horizontal: 'right',
			}),
		});
		onLoader(false);
	}
};

export default onMount;
