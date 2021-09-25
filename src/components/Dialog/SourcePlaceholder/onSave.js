import Store from 'components/Store';
import { SOURCE_PLACEHOLDER } from 'structures/source.js';
import onClose from './onClose.js';

const onSave = (e, itemId, valueId) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[itemId] === 'object') {
		jsObject.data[itemId].value = { 
			source_id: SOURCE_PLACEHOLDER.id,
			value: valueId,
		};
	}
	onClose();
};

export default onSave;
