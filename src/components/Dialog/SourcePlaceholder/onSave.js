import Store from 'components/Store';
import { SOURCE_PLACEHOLDER } from 'structures/source.js';
import onClose from './onClose.js';

const onSave = (e, itemId, valueId) => {
	const jsObject = Store().getState().jsObject;

	if (!jsObject.temp[itemId]) {
		jsObject.temp[itemId] = {
			id: itemId,
		};
	}
	jsObject.temp[itemId].value = { 
		source_id: SOURCE_PLACEHOLDER.id,
		value: valueId,
	};
	onClose();
};

export default onSave;
