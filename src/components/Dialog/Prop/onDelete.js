import Store from 'components/Store';
import { initialState as propInitialState } from 'components/Store/prop.js';
import onLoader from 'components/Loader/onLoader';
import onClose from 'components/Dialog/onClose.js';
import fetchPropDelete from 'fetch/propDelete.js';
import fetchCortegeDelete from 'fetch/cortegeDelete.js';
import axiosError from 'utils/axiosError.js';

const onDelete = async (e, scriptId, workspaceId, id) => {
	onLoader(true);
	
	try {
		const prop = Store().getState().prop;

		if (!(prop.entityId > 0)) {
			throw new Error('entityId is undefined');
		}

		await fetchPropDelete(JSON.stringify([ prop.entityId ]));
		await fetchCortegeDelete(JSON.stringify([ prop.sourceId ]));

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
