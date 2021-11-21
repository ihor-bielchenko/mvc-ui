import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import onMountJsObject from 'components/JsObject/onMount.js';
import fetchFuncOne from 'fetch/funcOne.js';
import axiosError from 'utils/axiosError.js';
import { DATA_TYPE_OBJECT } from 'structures/dataTypes.js';

const onMount = async (id, scriptId, workspaceId) => {
	const func = Store().getState().func;

	onLoader(true);

	try {
		const response = await fetchFuncOne(id);
		const data = ((response || {}).data || {}).data || {};
		
		await onMountJsObject(data.source_id, DATA_TYPE_OBJECT.id, scriptId, workspaceId);

		func.id = id;
		func.name = data.name;
		func.template_id = data.template_id;
		func.entityId = data.entity.id;
		func.sourceId = data.source_id;
		func.scriptId = scriptId;
		func.workspaceId = workspaceId;

		Store().dispatch({
			type: 'func',
			payload: () => func,
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
};

export default onMount;
