import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onSaveJsObject from 'components/JsObject/onSave.js';
import onMount from 'components/Script/onMount.js';
import fetchPropCreate from 'fetch/propCreate.js';
import axiosError from 'utils/axiosError.js';
import onClose from './onClose.js';

const onSave = async (e) => {
	onLoader(true);

	try {
		const prop = Store().getState().prop;
		const scriptId = getScriptId();
		const dataSource = await onSaveJsObject();

		if (prop.id > 0) {

		}
		else {
			await fetchPropCreate({
				script_id: scriptId,
				source_id: dataSource.id,
				name: prop.name,
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
