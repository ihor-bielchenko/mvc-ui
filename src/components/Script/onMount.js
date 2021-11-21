import Store from 'components/Store';
import { initialState as initialStateScript } from 'components/Store/script.js';
import onLoader from 'components/Loader/onLoader';
import onMountDb from 'components/Database/onMount.js';
import onMountDbColumns from 'components/Database/Columns/onMount.js';
import fetchEntityMany from 'fetch/entityMany.js';
import fetchArrowMany from 'fetch/arrowMany.js';
import fetchRouteMany from 'fetch/routeMany.js';
import fetchProjectMany from 'fetch/projectMany.js';
import axiosError from 'utils/axiosError.js';
import funcTemplates from 'structures/funcTemplates.js';
import { FUNC_CATEGORY_IF } from 'structures/funcCategories.js';

const onMount = async (scriptId, workspaceId) => {
	let {
		services,
		routes,
		script,
	} = Store().getState();

	if (scriptId > 0 && workspaceId > 0) {
		onLoader(true);
		
		try {
			const fetchArrowResponse = await fetchArrowMany(scriptId);
			const fetchArrowData = ((fetchArrowResponse || {}).data || {}).data || [];

			const fetchEntitiesResponse = await fetchEntityMany(scriptId);
			const fetchEntitiesData = ((fetchEntitiesResponse || {}).data || {}).data || [];

			script = { ...initialStateScript(workspaceId, scriptId), ...script };
			script[workspaceId].arrows = fetchArrowData;
			script[workspaceId].data = {};
			fetchEntitiesData.forEach((entity) => {
				if (entity.entity_prop) {
					entity.entityItemId = entity.entity_prop.id;
					entity.name = entity.entity_prop.name;
					entity.slotName = 'Prop';
					entity.type_key_name = 'entity_prop';
					entity.sourceId = entity.entity_prop.source_id;
				}
				else if (entity.entity_json) {
					entity.entityItemId = entity.entity_json.id;
					entity.name = entity.entity_json.name;
					entity.slotName = 'Json';
					entity.type_key_name = 'entity_json';
					entity.sourceId = entity.entity_json.source_id;
				}
				else if (entity.entity_func) {
					if (funcTemplates[entity.entity_func.template_id].category_id === FUNC_CATEGORY_IF.id) {
						entity.slotName = 'Condition';
					}
					else {
						entity.slotName = 'Func';
					}
					entity.entityItemId = entity.entity_func.id;
					entity.name = entity.entity_func.name;
					entity.type_key_name = 'entity_func';
					entity.sourceId = entity.entity_func.source_id;
				}
				script[workspaceId].data[entity.id] = { ...entity };
			});
			script[workspaceId].loadedFlag = true;

			Store().dispatch({
				type: 'script',
				payload: () => {
					setTimeout(async () => {
						try {
							await onMountDb();
							onMountDbColumns();

							const fetchProjectResponse = await fetchProjectMany();
							const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || [];

							const fetchDbRowResponse = await fetchRouteMany(1, {
								limit: 999,
								filter: JSON.stringify({ service_id: scriptId }),
							});
							const fetchDbRowData = ((fetchDbRowResponse || {}).data || {}).data || [];
							const collectorServices = [];

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
							routes.data = [ ...fetchDbRowData ];

							Store().dispatch({
								type: 'services',
								payload: () => ({ ...services }),
							});
							Store().dispatch({
								type: 'routes',
								payload: () => ({ ...routes }),
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
							onLoader(false);
						}
					}, 0);
					return ({ ...script });
				},
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
			onLoader(false);
		}
	}
};

export default onMount;
