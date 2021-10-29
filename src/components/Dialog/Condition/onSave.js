import Store from 'components/Store';
import { initialState as initialStateFunc } from 'components/Store/func.js';
import { initialState as initialStateJsObject } from 'components/Store/jsObject.js';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onMount from 'components/Script/onMount.js';
import fetchFuncCreate from 'fetch/funcCreate.js';
import fetchFuncUpdate from 'fetch/funcUpdate.js';
import fetchArrowCreate from 'fetch/arrowCreate.js';
import axiosError from 'utils/axiosError.js';
import funcTemplates from 'structures/funcTemplates.js';
import onClose from './onClose.js';

const onSave = async (e, fromEntityId, fromArrowTypeId) => {
	onLoader(true);

	try {
		const scriptId = getScriptId();
		const func = Store().getState().func;

		if (func.id > 0 && func.sourceId > 0) {
			await fetchFuncUpdate(func.id, {
				script_id: scriptId,
				name: func.name,
				template_id: func.template_id,
				data_type_id: funcTemplates[func.template_id].data_type_id,
			});

			Store().dispatch({
				type: 'func',
				payload: () => ({ ...func }),
			});
		}
		else if (fromEntityId >= 0) {
			const fetchFuncResponse = await fetchFuncCreate({
				script_id: scriptId,
				name: func.name,
				template_id: func.template_id,
				data_type_id: funcTemplates[func.template_id].data_type_id,
			});
			const fetchFuncData = ((fetchFuncResponse || {}).data || {}).data || {};

			await fetchArrowCreate({
				script_id: scriptId,
				from_entity_id: fromEntityId, 
				to_entity_id: fetchFuncData.entity_id,
				arrow_type_id: fromArrowTypeId,
			});
			Store().dispatch({
				type: 'func',
				payload: () => initialStateFunc(),
			});
			Store().dispatch({
				type: 'jsObject',
				payload: () => initialStateJsObject(),
			});
			onMount(scriptId);
			onClose(e);
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
