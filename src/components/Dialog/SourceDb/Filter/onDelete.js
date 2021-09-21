import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';

const onDelete = (id) => () => {
	const prop = Store().getState().prop;

	if ((prop.tempValue.filter || {})[id]) {
		delete prop.tempValue.filter[id];
		delete prop.filterFormId;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
		onClose(DIALOG_DELETE_CONFIRM)();
	}
};

export default onDelete;
