import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onValueScript = (id, setLogicValue) => (e, scriptId, workspaceId, entityId, dataTypeId) => {
	const jsObject = Store().getState().jsObject;

	if (!jsObject.tempValue['query']) {
		jsObject.tempValue['query'] = {};
	}
	if (!jsObject.tempValue['query'][id]) {
		jsObject.tempValue['query'][id] = {
			id,
			value: '',
			left: false,
			right: false,
		};
	}
	jsObject.tempValue.query[id].value = {
		source_type_id: SOURCE_TYPE_SCRIPT.id,
		script_id: scriptId,
		data_type_id: dataTypeId,
		id: entityId,
		workspaceId,
	};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onValueScript;
