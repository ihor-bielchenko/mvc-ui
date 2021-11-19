import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchServiceOne from 'fetch/serviceOne.js';
import getServiceId from './getServiceId.js';

const onMount = async () => {
	onLoader(true);

	try {
		const serviceId = getServiceId();

		if (serviceId > 0) {
			const services = Store().getState().services;
			const fetchServiceResponse = await fetchServiceOne(serviceId);
			const fetchServiceData = ((fetchServiceResponse || {}).data || {}).data || {};
		
			services.form = { ...fetchServiceData };
			Store().dispatch({
				type: 'services',
				payload: () => ({ ...services }),
			});
		}
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
	}
	onLoader(false);
};

export default onMount;
