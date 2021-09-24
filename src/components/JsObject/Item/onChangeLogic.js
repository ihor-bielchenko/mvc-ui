import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import { COLUMN_TEXT } from 'structures/columnTypes.js';

const onChangeLogic = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.temp[id] === 'undefined') {
		jsObject.temp[id] = {
			id,
			type_id: COLUMN_TEXT.id,
			key: '',
			value: '',
		};
	}
	jsObject.tempValue = { ...jsObject.temp[id].value };
	onDialog(jsObject.temp[id].value.source_id, { 
		name: id, 
	})();
};

export default onChangeLogic;
