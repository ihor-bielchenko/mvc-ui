import Store from 'components/Store';
import { initialState as initialStateServices } from 'components/Store/services.js';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchProjectMany from 'fetch/projectMany.js';

const onMount = async () => {
	onLoader(true);

	try {
		const list = Store().getState().list;
		const fetchProjectResponse = await fetchProjectMany();
		const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || [];
		const projects = {};
	
		list.data = {};
		fetchProjectData.forEach((project) => {
			const services = {};

			project.services.forEach((service) => {
				services[service.id] = { ...service };
			});
			projects[project.id] = {
				...project,
				services,
			};
		});
		list.data = projects;
		Store().dispatch({
			type: 'list',
			payload: () => ({ ...list }),
		});
		Store().dispatch({
			type: 'services',
			payload: () => initialStateServices(),
		});
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
