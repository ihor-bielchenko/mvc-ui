import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import { DIALOG_DB_COLUMN } from 'consts/dialog.js';
import onClose from '../onClose.js';

const onSave = async (e, tableId, columnId, columnNewId, setError) => {
	onLoader(true);

	setTimeout(() => {
		const db = Store().getState().db;
		const id = db.tempValue[columnId]
			? columnId
			: columnNewId;
		const tempValue = { ...db.tempValue[id].tempValue };

		delete db.tempValue[id].tempValue;
		db.tempValue[id] = { ...tempValue };

		Store().dispatch({
			type: 'db',
			payload: () => ({ ...db }),
		});
		onClose(DIALOG_DB_COLUMN)(e);
		onLoader(false);
	}, 600);
};

export default onSave;
