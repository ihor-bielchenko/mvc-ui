import Store from 'components/Store';
import { initialState as propInitialState } from 'components/Store/prop.js';
import onLoader from 'components/Loader/onLoader';
import onClose from 'components/Dialog/onClose.js';
import onMountScript from 'components/Script/onMount.js';
import fetchPropDelete from 'fetch/propDelete.js';
import fetchCortegeDelete from 'fetch/cortegeDelete.js';
import axiosError from 'utils/axiosError.js';

const onDelete = async (e, scriptId, workspaceId, id) => {
	onLoader(true);

	const script = Store().getState().script;
	
	try {
		if (script[workspaceId].data[id].sourceId > 0) {
			await fetchCortegeDelete(JSON.stringify([ script[workspaceId].data[id].sourceId ]));
		}
	}
	catch (err) {
	}
	try {
		if (!(script[workspaceId].data[id].sourceId > 0)) {
			throw new Error('sourceId is undefined');
		}
		await fetchPropDelete(JSON.stringify([ id ]));
		await onMountScript(scriptId, workspaceId);

		onClose()();

		Store().dispatch({
			type: 'prop',
			payload: () => propInitialState(),
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

export default onDelete;
