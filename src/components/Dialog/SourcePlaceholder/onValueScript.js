import Store from 'components/Store';
import { 
	SOURCE_TYPE_PLACEHOLDER,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import onCloseDialog from '../onClose.js';
import onClose from './onClose.js';

const onValueScript = (id) => (e, scriptId, workspaceId, entityId, dataTypeId) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id].value = { 
			source_type_id: SOURCE_TYPE_PLACEHOLDER.id,
			value: {
				source_type_id: SOURCE_TYPE_SCRIPT.id,
				script_id: scriptId,
				data_type_id: dataTypeId,
				id: entityId,
				workspaceId,
			},
		};
	}
	onClose(e);
	onCloseDialog(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onValueScript;
