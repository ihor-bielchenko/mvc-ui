import Store from 'components/Store';
import { initialState as jsonInitialState } from 'components/Store/json.js';
import onLoader from 'components/Loader/onLoader';
import onClose from 'components/Dialog/onClose.js';
import fetchJsonDelete from 'fetch/jsonDelete.js';
import fetchCortegeDelete from 'fetch/cortegeDelete.js';
import axiosError from 'utils/axiosError.js';

const onDelete = async (e, id) => {
	onLoader(true);
	
	try {
		const json = Store().getState().json;
		
		await fetchJsonDelete(JSON.stringify([ id ]));
		await fetchCortegeDelete(JSON.stringify([ json.sourceId ]));

		onClose()();
		Store().dispatch({
			type: 'json',
			payload: () => jsonInitialState(),
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
