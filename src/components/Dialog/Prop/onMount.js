import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchPropOne from 'fetch/propOne.js';
import fetchProjectMany from 'fetch/projectMany.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (id, scriptId, workspaceId) => {
	const {
		prop,
		services,
	} = Store().getState();

	onLoader(true);

	try {
		const fetchProjectResponse = await fetchProjectMany();
		const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || [];
		const collectorServices = [];

		const response = await fetchPropOne(id);
		const data = ((response || {}).data || {}).data || {};

		prop.id = id;
		prop.name = data.name;
		prop.sourceId = data.source_id;
		prop.as_variable = data.as_variable;
		prop.entityId = data.entity.id;
		prop.scriptId = scriptId;
		prop.workspaceId = workspaceId;
		fetchProjectData.forEach((project) => {
			project.services.forEach(({ 
				id, 
				name, 
			}) => {
				collectorServices.push({
					id,
					name,
				});
			});
		});
		services.data = [ ...collectorServices ];

		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
		Store().dispatch({
			type: 'services',
			payload: () => ({ ...services }),
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
