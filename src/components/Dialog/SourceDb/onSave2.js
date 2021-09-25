import Store from 'components/Store';
// import { SOURCE_DB } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
	// COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const onSave = (e, itemId, onClose) => {
	const jsObject = Store().getState().jsObject;
	const currentItem = jsObject.data[itemId];
	const parentItem = jsObject.data[currentItem.parent_id];
	const typeId = parentItem.type_id;

	if (typeof currentItem === 'object') {
		const lengthItemId = Date.now();

		jsObject.data[lengthItemId] = {
			parent_id: typeId === FORMAT_ATOMIC.id
				? currentItem.parent_id
				: itemId,
			id: lengthItemId,
			type_id: COLUMN_OBJ.id,
			key: 'n',
			value: '',
		};

		if (jsObject.tempValue.select.length > 1) {
			if (typeId === FORMAT_ATOMIC.id) {
				parentItem.type_id = COLUMN_OBJ.id;
				jsObject.blocks[currentItem.parent_id] = [
					jsObject.data[lengthItemId],
				];

				if (parentItem.id === 0) {
					jsObject.data = {
						0: jsObject.data[0],
						[]
					};
				}
			}
			else {
				currentItem.type_id = COLUMN_OBJ.id;
				jsObject.blocks[itemId] = [
					jsObject.data[lengthItemId],
				];
			}
		}
		if (jsObject.tempValue.is_collection) {
			if (typeof jsObject.tempValue.offset === 'undefined') {
				jsObject.tempValue['offset'] = 0;
			}
			if (typeof jsObject.tempValue.limit === 'undefined') {
				jsObject.tempValue['limit'] = 10;
			}
			if (typeId === FORMAT_ATOMIC.id) {
				parentItem.type_id = COLUMN_ARR.id;
				jsObject.blocks[currentItem.parent_id] = [
					jsObject.data[lengthItemId],
				];
			}
			else {
				currentItem.type_id = COLUMN_ARR.id;
				jsObject.blocks[itemId] = [
					jsObject.data[lengthItemId],
				];
			}
		}
		console.log('jsObject', itemId, jsObject);

		// jsObject.data[itemId].value = { 
		// 	source_id: SOURCE_DB.id,
		// 	...jsObject.tempValue, 
		// };
		jsObject.tempValue = {};
		onClose();
	}
};

export default onSave;
