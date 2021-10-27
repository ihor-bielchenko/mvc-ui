import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onSaveJsObject from 'components/JsObject/onSave.js';
// import onMount from 'components/Script/onMount.js';
import fetchPropCreate from 'fetch/propCreate.js';
import fetchPropUpdate from 'fetch/propUpdate.js';
import axiosError from 'utils/axiosError.js';
import onClose from './onClose.js';

const onSave = async (e) => {
	onLoader(true);

	try {
		const prop = Store().getState().prop;
		const scriptId = getScriptId();

		if (prop.id > 0 && prop.sourceId > 0) {
			const dataSource = await onSaveJsObject(prop.sourceId);

			await fetchPropUpdate(prop.id, {
				script_id: scriptId,
				source_id: dataSource.id,
				name: prop.name,
				as_variable: Number(!!prop.as_variable),
			});
			prop.sourceId = dataSource.id;

			Store().dispatch({
				type: 'prop',
				payload: () => ({ ...prop }),
			});
		}
		else {
			const dataSource = await onSaveJsObject();

			await fetchPropCreate({
				script_id: scriptId,
				source_id: dataSource.id,
				name: prop.name,
				as_variable: Number(!!prop.as_variable),
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
