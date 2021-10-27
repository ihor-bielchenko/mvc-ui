import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
// import onMount from 'components/Script/onMount.js';
import fetchFuncCreate from 'fetch/funcCreate.js';
import fetchFuncUpdate from 'fetch/funcUpdate.js';
import axiosError from 'utils/axiosError.js';
import onClose from './onClose.js';

const onSave = async (e) => {
	onLoader(true);

	try {
		const func = Store().getState().func;

		if (func.id > 0 && func.sourceId > 0) {
			await fetchFuncUpdate(func.id, {
				name: func.name,
				template_id: func.template_id,
			});

			Store().dispatch({
				type: 'func',
				payload: () => ({ ...func }),
			});
		}
		else {
			const scriptId = getScriptId();

			await fetchFuncCreate({
				script_id: scriptId,
				name: func.name,
				template_id: func.template_id,
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
