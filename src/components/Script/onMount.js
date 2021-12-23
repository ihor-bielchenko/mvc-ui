import Store from 'components/Store';
import { initialState as initialStateScript } from 'components/Store/script.js';
import onLoader from 'components/Loader/onLoader';
import fetchEntityMany from 'fetch/entityMany.js';
import fetchArrowMany from 'fetch/arrowMany.js';
import axiosError from 'utils/axiosError.js';
import funcTemplates from 'structures/funcTemplates.js';
import { FUNC_CATEGORY_IF } from 'structures/funcCategories.js';

const onMount = async (scriptId, workspaceId) => {
	let script = Store().getState().script;

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
					entity.entityItemId = entity.entity_prop.id;					entity.slotName = 'Prop';
					entity.type_key_name = 'entity_prop';
					entity.entity_prop.name = entity.name;
					entity.entity_prop.source_id = entity.source_id;
					entity.entity_prop.status_id = entity.status_id;
					entity.sourceId = entity.source_id;
				}
				else if (entity.entity_json) {
					entity.entityItemId = entity.entity_json.id;
					entity.slotName = 'Json';
					entity.type_key_name = 'entity_json';
					entity.entity_json.name = entity.name;
					entity.entity_json.source_id = entity.source_id;
					entity.entity_json.status_id = entity.status_id;
					entity.sourceId = entity.source_id;
				}
				else if (entity.entity_func) {
					if (funcTemplates[entity.entity_func.template_id].category_id === FUNC_CATEGORY_IF.id) {
						entity.slotName = 'Condition';
					}
					else {
						entity.slotName = 'Func';
					}
					entity.entityItemId = entity.entity_func.id;
					entity.type_key_name = 'entity_func';
					entity.entity_func.name = entity.name;
					entity.entity_func.source_id = entity.source_id;
					entity.entity_func.status_id = entity.status_id;
					entity.sourceId = entity.source_id;
				}
				script[workspaceId].data[entity.id] = { ...entity };
			});
			script[workspaceId].loadedFlag = true;

			Store().dispatch({
				type: 'script',
				payload: () => ({ ...script }),
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
	}
};

export default onMount;
