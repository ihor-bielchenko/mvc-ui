import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onSaveJsObject from 'components/JsObject/onSave.js';
// import onMount from 'components/Script/onMount.js';
import fetchJsonCreate from 'fetch/jsonCreate.js';
import fetchJsonUpdate from 'fetch/jsonUpdate.js';
import axiosError from 'utils/axiosError.js';
import onClose from './onClose.js';

const onSave = async (e) => {
	onLoader(true);

	try {
		const json = Store().getState().json;
		const scriptId = getScriptId();

		if (json.id > 0 && json.sourceId > 0) {
			const dataSource = await onSaveJsObject(json.sourceId);

			await fetchJsonUpdate(json.id, {
				script_id: scriptId,
				source_id: dataSource.id,
				name: json.name,
				code: json.code,
			});
			json.sourceId = dataSource.id;

			Store().dispatch({
				type: 'json',
				payload: () => ({ ...json }),
			});
		}
		else {
			const dataSource = await onSaveJsObject();

			await fetchJsonCreate({
				script_id: scriptId,
				source_id: dataSource.id,
				name: json.name,
				code: json.code,
			});
			// onMount(scriptId);
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
