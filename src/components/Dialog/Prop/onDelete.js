import Store from 'components/Store';
import { initialState as propInitialState } from 'components/Store/prop.js';
import onLoader from 'components/Loader/onLoader';
import onClose from 'components/Dialog/onClose.js';
import fetchEntityDelete from 'fetch/entityDelete.js';
import axiosError from 'utils/axiosError.js';

const onDelete = async (e, id) => {
	onLoader(true);
	
	try {
		const entities = Store().getState().entities;
		
		if (!entities.data[id]) {
			throw new Error('Entity is undefined');
		}

		await fetchEntityDelete(JSON.stringify([ id ]));

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
		onLoader(false);
	}
};

export default onDelete;
