import Store from 'components/Store';
import { SOURCE_TYPE_PLACEHOLDER } from 'structures/sourceTypes.js';
import onClose from './onClose.js';

const onSave = (e, itemId, valueId) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[itemId] === 'object') {
		jsObject.data[itemId].value = { 
			source_type_id: SOURCE_TYPE_PLACEHOLDER.id,
			value: valueId,
		};
	}
	onClose();
};

export default onSave;
