import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchPropOne from 'fetch/propOne.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (id) => {
	const prop = Store().getState().prop;

	onLoader(true);

	try {
		const response = await fetchPropOne(id);
		const data = ((response || {}).data || {}).data || {};
		
		prop.id = id;
		prop.name = data.name;
		
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
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
