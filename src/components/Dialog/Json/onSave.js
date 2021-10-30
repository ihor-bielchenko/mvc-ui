import Store from 'components/Store';
import { initialState as initialStateJson } from 'components/Store/json.js';
import { initialState as initialStateJsObject } from 'components/Store/jsObject.js';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onSaveJsObject from 'components/JsObject/onSave.js';
import onMount from 'components/Script/onMount.js';
import fetchJsonCreate from 'fetch/jsonCreate.js';
import fetchJsonUpdate from 'fetch/jsonUpdate.js';
import fetchArrowCreate from 'fetch/arrowCreate.js';
import axiosError from 'utils/axiosError.js';
import { DATA_TYPE_ATOMIC } from 'structures/dataTypes.js';
import onClose from './onClose.js';

const onSave = async (e, fromEntityId, fromArrowTypeId) => {
	onLoader(true);

	try {
		const {
			json,
			jsObject,
			script,
		} = Store().getState();
		const scriptId = getScriptId();

		if (json.id > 0 && json.sourceId > 0) {
			const dataSource = await onSaveJsObject(json.sourceId);

			await fetchJsonUpdate(json.id, {
				script_id: scriptId,
				source_id: dataSource.id,
				data_type_id: jsObject.data[0].data_type_id === DATA_TYPE_ATOMIC.id
					? jsObject.data[Object.keys(jsObject.data)[1]].data_type_id
					: jsObject.data[0].data_type_id,
				name: json.name,
				code: json.code,
			});
			json.sourceId = dataSource.id;

			Store().dispatch({
				type: 'json',
				payload: () => ({ ...json }),
			});
			onLoader(false);
		}
		else if (fromEntityId >= 0) {
			const dataSource = await onSaveJsObject();
			const fetchJsonResponse = await fetchJsonCreate({
				script_id: scriptId,
				source_id: dataSource.id,
				data_type_id: jsObject.data[0].data_type_id === DATA_TYPE_ATOMIC.id
					? jsObject.data[Object.keys(jsObject.data)[1]].data_type_id
					: jsObject.data[0].data_type_id,
				name: json.name,
				code: json.code,
			});
			const fetchJsonData = ((fetchJsonResponse || {}).data || {}).data || {};

			await fetchArrowCreate({
				script_id: scriptId,
				from_entity_id: fromEntityId, 
				to_entity_id: fetchJsonData.entity_id,
				arrow_type_id: fromArrowTypeId,
			});
			script[scriptId].loadedFlag = false;

			Store().dispatch({
				type: 'script',
				payload: () => ({ ...script }),
			});
			Store().dispatch({
				type: 'json',
				payload: () => initialStateJson(),
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
		onLoader(false);
	}
};

export default onSave;
