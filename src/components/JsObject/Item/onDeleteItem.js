import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { 
	COLUMN_OBJ,
	COLUMN_ARR, 
} from 'structures/columnTypes.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const recursion = (data, id) => {
	const dataKeys = Object.keys(data);
	let i = 0;

	while (i < dataKeys.length) {
		if (id === dataKeys[i]) {
			delete data[id];
			break;
		}
		else if (typeof (data[dataKeys[i]] || {}).value === 'object' 
			&& ((data[dataKeys[i]] || {}).type_id === COLUMN_OBJ.id
				|| (data[dataKeys[i]] || {}).type_id === COLUMN_ARR.id)) {
			data[dataKeys[i]].value = recursion(data[dataKeys[i]].value, id);
			break;
		}
		i++;
	}
	return ({ ...data });
};

const onDeleteItem = (e, id) => {
	const jsObject = Store().getState().jsObject;

	jsObject.data = recursion(jsObject.data, id);
	onClose(DIALOG_DELETE_CONFIRM)(e);
};

export default onDeleteItem;
