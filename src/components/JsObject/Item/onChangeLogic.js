import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';

const onChangeLogic = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object'
		&& typeof jsObject.data[id].value === 'object'
		&& jsObject.data[id].value.source_id > 0) {
		jsObject.tempValue = { ...jsObject.data[id].value };
		onDialog(jsObject.data[id].value.source_id, { 
			name: id, 
		})();
	}
};

export default onChangeLogic;
