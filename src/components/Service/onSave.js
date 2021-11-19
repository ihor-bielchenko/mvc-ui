import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchServiceCreate from 'fetch/serviceCreate.js';
import fetchServiceUpdate from 'fetch/serviceUpdate.js';
import { SERVICE_TEMPLATE_BASE } from 'structures/serviceTemplates.js';
import { PROTOCOL_TYPE_HTTP } from 'structures/protocol.js';
import { URL_PAGE_SERVICE } from 'consts/url.js';
import getProjectId from './getProjectId.js';

const onSave = async (e, historyPush) => {
	onLoader(true);

	try {
		const services = Store().getState().services;
		const projectId = getProjectId();

		if (!(projectId > 0)) {
			throw new Error('undefined projectId');
		}
		if (services.form.id > 0) {
			await fetchServiceUpdate(services.form.id, {
				name: services.form.name,
				protocol_id: PROTOCOL_TYPE_HTTP.id,
				subdomain_path: services.form.subdomain_path,
			});
		}
		else {
			const fetchServiceResponse = await fetchServiceCreate({
				project_id: getProjectId(),
				template_id: SERVICE_TEMPLATE_BASE.id,
				name: services.form.name,
				protocol_id: PROTOCOL_TYPE_HTTP.id,
				subdomain_path: services.form.subdomain_path,
			});
			const fetchServiceData = ((fetchServiceResponse || {}).data || {}).data || {};
			
			services.form = { ...fetchServiceData };
			Store().dispatch({
				type: 'services',
				payload: () => ({ ...services }),
			});
			historyPush(`/${projectId}/${URL_PAGE_SERVICE}/${fetchServiceData.id}`);
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

export default onSave;
