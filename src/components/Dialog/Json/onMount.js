import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchJsonOne from 'fetch/jsonOne.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (id, scriptId, workspaceId) => {
	const json = Store().getState().json;

	onLoader(true);

	try {
		const response = await fetchJsonOne(id);
		const data = ((response || {}).data || {}).data || {};
		
		json.id = id;
		json.name = data.name;
		json.sourceId = data.source_id;
		json.code = data.code;
		json.entityId = data.entity.id;
		json.scriptId = scriptId;
		json.workspaceId = workspaceId;

		Store().dispatch({
			type: 'json',
			payload: () => ({ ...json }),
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
