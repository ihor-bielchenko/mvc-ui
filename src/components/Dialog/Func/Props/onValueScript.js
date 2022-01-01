import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onValueScript = (index) => (e, scriptId, workspaceId, entityId, dataTypeId) => {
	const jsObject = Store().getState().jsObject;

	if ((jsObject.blocks[0] || [])[index]) {
		(jsObject.blocks[0] || [])[index].value = {
			source_type_id: SOURCE_TYPE_SCRIPT.id,
			script_id: scriptId,
			data_type_id: dataTypeId,
			id: entityId,
			workspaceId,
		};
		console.log('index', index);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(SOURCE_TYPE_SCRIPT.id)(e);
	}
};

export default onValueScript;

