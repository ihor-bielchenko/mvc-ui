import Store from 'components/Store';
import { initialState as funcInitialState } from 'components/Store/func.js';
import onLoader from 'components/Loader/onLoader';
import onClose from 'components/Dialog/onClose.js';
import fetchFuncDelete from 'fetch/funcDelete.js';
import fetchCortegeDelete from 'fetch/cortegeDelete.js';
import axiosError from 'utils/axiosError.js';

const onDelete = async (e, id) => {
	onLoader(true);
	
	try {
		const func = Store().getState().func;
		
		if (!(func.entityId > 0)) {
			throw new Error('entityId is undefined');
		}

		await fetchFuncDelete(JSON.stringify([ func.entityId ]));
		await fetchCortegeDelete(JSON.stringify([ func.sourceId ]));

		onClose()();
		Store().dispatch({
			type: 'func',
			payload: () => funcInitialState(),
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
