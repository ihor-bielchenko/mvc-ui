import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import onMountList from 'components/Database/List/onMount.js';
import axiosError from 'utils/axiosError.js';
import fetchDbRowCreate from 'fetch/dbRowCreate.js';
import fetchDbRowUpdate from 'fetch/dbRowUpdate.js';
import onClose from './onClose.js';

const onSave = async (e, tableId, rowId, setError = () => {}) => {
	onLoader(true);

	try {
		const db = Store().getState().db;
		const columns = db.columns;
		const tempValueKeys = Object.keys(db.tempValue);
		const error = {};

		tempValueKeys.forEach((columnId) => {
			if (columns[columnId].required 
				&& (db.tempValue[columnId] === ''
					|| typeof db.tempValue[columnId] === 'undefined'
					|| db.tempValue[columnId] === null)) {
				error[columnId] = true;
			}
		});
		if (Object.keys(error).length > 0) {
			setError((currentState) => ({
				...currentState,
				...error,
			}));
		}
		else {
			(rowId > 0)
				? await fetchDbRowUpdate(rowId, { ...db.tempValue })
				: await fetchDbRowCreate(tableId, { ...db.tempValue });
			onClose();
			await onMountList(tableId, 0, 20);
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
