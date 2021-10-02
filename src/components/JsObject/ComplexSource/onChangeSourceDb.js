import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { SOURCE_DB } from 'structures/source.js';

const onChangeSourceDb = (e, id) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue = { ...jsObject.data[id].source.value };
	onDialog(SOURCE_DB.id, { 
		name: id, 
		isEditFlag: true,
	})();
};

export default onChangeSourceDb;
