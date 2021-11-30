import Store from 'components/Store';
import { initialState as initialStateFunc } from 'components/Store/func.js';
import { initialState as initialStateJsObject } from 'components/Store/jsObject.js';
import onLoader from 'components/Loader/onLoader';
import onSaveJsObject from 'components/JsObject/onSave.js';
import onMountScript from 'components/Script/onMount.js';
import fetchFuncCreate from 'fetch/funcCreate.js';
import fetchFuncUpdate from 'fetch/funcUpdate.js';
import fetchArrowCreate from 'fetch/arrowCreate.js';
import axiosError from 'utils/axiosError.js';
import funcTemplates from 'structures/funcTemplates.js';
import onClose from './onClose.js';

const onSave = async (e, scriptId, workspaceId, fromEntityId, fromArrowTypeId) => {
	onLoader(true);

	try {
		const {
			func,
			script,
		} = Store().getState();

		if (func.id > 0 && func.sourceId > 0) {
			const dataSource = await onSaveJsObject(func.sourceId);

			await fetchFuncUpdate(func.id, {
				script_id: scriptId,
				source_id: dataSource.id,
				name: func.name,
				template_id: func.template_id,
				category_id: func.category_id,
				data_type_id: funcTemplates[func.template_id].data_type_id,
			});
			func.sourceId = dataSource.id;

			Store().dispatch({
				type: 'func',
				payload: () => ({ ...func }),
			});
		}
		else if (fromEntityId >= 0) {
			const dataSource = await onSaveJsObject(func.sourceId);
			const fetchFuncResponse = await fetchFuncCreate({
				script_id: scriptId,
				source_id: dataSource.id,
				name: func.name,
				category_id: func.category_id,
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
			script[workspaceId].loadedFlag = false;

			Store().dispatch({
				type: 'script',
				payload: () => ({ ...script }),
			});
			Store().dispatch({
				type: 'func',
				payload: () => initialStateFunc(),
			});
			Store().dispatch({
				type: 'jsObject',
				payload: () => initialStateJsObject(),
			});
			onMountScript(scriptId, workspaceId);
			onClose(e, workspaceId);
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
