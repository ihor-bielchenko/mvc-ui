import Store from 'components/Store';
import { SOURCE_DB } from 'structures/source.js';

const onSave = (e, itemId, onClose) => {
	const jsObject = Store().getState().jsObject;

	if (!jsObject.temp[itemId]) {
		jsObject.temp[itemId] = {
			id: itemId,
		};
	}
	if (typeof jsObject.temp[itemId] !== 'undefined') {
		if (jsObject.tempValue.is_collection) {
			if (typeof jsObject.tempValue.offset === 'undefined') {
				jsObject.tempValue['offset'] = 0;
			}
			if (typeof jsObject.tempValue.limit === 'undefined') {
				jsObject.tempValue['limit'] = 10;
			}
		}

		jsObject.temp[itemId].value = { 
			source_id: SOURCE_DB.id,
			...jsObject.tempValue, 
		};
		jsObject.tempValue = {};
		onClose();
	}
};

export default onSave;
