import Store from 'components/Store';
import getServiceId from 'components/Service/getServiceId.js';
import getProjectId from 'components/Service/getProjectId.js';
import onClose from 'components/Dialog/onClose.js';
import fetchBuildServiceStop from 'fetch/buildServiceStop.js';
import axiosError from 'utils/axiosError.js';

const onStop = async () => {
	try {
		await fetchBuildServiceStop({
			service_id: getServiceId(),
			project_id: getProjectId(),
		});
		const services = Store().getState().services;

		services.form.server_status_id = process.env.SERVER_STATUS_BUILDED;
		Store().dispatch({
			type: 'services',
			payload: () => ({ ...services }),
		});
		onClose()();
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
};

export default onStop;
