import Store from 'components/Store';
import { SOURCE_TYPE_PLACEHOLDER } from 'structures/sourceTypes.js';
import onClose from './onClose.js';

const onSave = (e, id, pathId) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id].value = { 
			source_type_id: SOURCE_TYPE_PLACEHOLDER.id,
			value: pathId,
		};
	}
	onClose();
};

export default onSave;
