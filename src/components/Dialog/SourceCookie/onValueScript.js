import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onValueScript = (id) => (e, scriptId, workspaceId, entityId, dataTypeId) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;

	jsObject.tempValue.value = {
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
