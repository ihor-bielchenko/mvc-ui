import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchPropOne from 'fetch/propOne.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (id, scriptId, workspaceId) => {
	const prop = Store().getState().prop;

	onLoader(true);

	try {
		const response = await fetchPropOne(id);
		const data = ((response || {}).data || {}).data || {};

		prop.id = id;
		prop.name = data.name;
		prop.sourceId = data.source_id;
		prop.as_variable = data.as_variable;
		prop.entityId = data.entity.id;
		prop.scriptId = scriptId;
		prop.workspaceId = workspaceId;

		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
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
