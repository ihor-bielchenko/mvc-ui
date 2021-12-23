import Store from 'components/Store';
import { initialState as initialStateProp } from 'components/Store/prop.js';
import { initialState as initialStateJsObject } from 'components/Store/jsObject.js';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onSaveJsObject from 'components/JsObject/onSave.js';
import onMountScript from 'components/Script/onMount.js';
import fetchPropCreate from 'fetch/propCreate.js';
import fetchPropUpdate from 'fetch/propUpdate.js';
import fetchArrowCreate from 'fetch/arrowCreate.js';
import fetchEntityTest from 'fetch/entityTest.js';
import axiosError from 'utils/axiosError.js';
import { DATA_TYPE_ATOMIC } from 'structures/dataTypes.js';
import onClose from './onClose.js';

const onSave = async (e, scriptId, workspaceId, fromEntityId, fromArrowTypeId) => {
	onLoader(true);

	try {
		const {
			prop,
			jsObject,
			script,
		} = Store().getState();
		const scriptId = getScriptId();

		if (prop.id > 0 && prop.sourceId > 0) {
			await fetchEntityTest(prop.id, {
				script_id: scriptId,
				name: prop.name,
			});

			const dataSource = await onSaveJsObject(prop.sourceId);

			await fetchPropUpdate(prop.id, {
				script_id: scriptId,
				source_id: dataSource.id,
				data_type_id: jsObject.data[0].data_type_id === DATA_TYPE_ATOMIC.id
					? jsObject.data[Object.keys(jsObject.data)[1]].data_type_id
					: jsObject.data[0].data_type_id,
				name: prop.name,
				as_variable: Number(!!prop.as_variable),
			});
			prop.sourceId = dataSource.id;
			
			Store().dispatch({
				type: 'prop',
				payload: () => ({ ...prop }),
			});
			Store().dispatch({
				type: 'jsObject',
				payload: () => initialStateJsObject(),
			});
		}
		else if (fromEntityId >= 0) {
			const dataSource = await onSaveJsObject();
			const fetchPropResponse = await fetchPropCreate({
				script_id: scriptId,
				source_id: dataSource.id,
				data_type_id: jsObject.data[0].data_type_id === DATA_TYPE_ATOMIC.id
					? jsObject.data[Object.keys(jsObject.data)[1]].data_type_id
					: jsObject.data[0].data_type_id,
				name: prop.name,
				as_variable: Number(!!prop.as_variable),
			});
			const fetchPropData = ((fetchPropResponse || {}).data || {}).data || {};

			await fetchArrowCreate({
				script_id: scriptId,
				from_entity_id: fromEntityId, 
				to_entity_id: fetchPropData.entity_id,
				arrow_type_id: fromArrowTypeId,
			});
			script[workspaceId].loadedFlag = false;
			
			Store().dispatch({
				type: 'script',
				payload: () => ({ ...script }),
			});
			Store().dispatch({
				type: 'prop',
				payload: () => initialStateProp(),
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
