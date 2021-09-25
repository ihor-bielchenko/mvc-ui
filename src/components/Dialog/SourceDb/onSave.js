import Store from 'components/Store';
import { SOURCE_DB } from 'structures/source.js';
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
	const parentTypeId = parentItem.type_id;

	if (typeof currentItem === 'object') {
		if (jsObject.tempValue.select.length > 1) {
			if (parentTypeId === FORMAT_ATOMIC.id) {
				parentItem.type_id = COLUMN_OBJ.id;
				parentItem.disabled = true;

				// if (parentItem.id === 0) {
				// 	jsObject.blocks[0][0].type_id = COLUMN_OBJ.id;
				// 	jsObject.blocks[0][0].key = 'n';
				// 	jsObject.blocks[0][0].value = {};
				// }
			}
			else {
				currentItem.type_id = COLUMN_OBJ.id;
				currentItem.disabled = true;
				// jsObject.blocks[itemId] = [{
				// 	parent_id: currentItem.parent_id,
				// 	id: Date.now(),
				// 	type_id: COLUMN_OBJ.id,
				// 	key: 'n',
				// 	value: {},
				// }];
				// jsObject.data[jsObject.blocks[itemId][0].id] = jsObject.blocks[itemId][0];
			}
		}
		if (jsObject.tempValue.is_collection) {
			if (typeof jsObject.tempValue.offset === 'undefined') {
				jsObject.tempValue['offset'] = 0;
			}
			if (typeof jsObject.tempValue.limit === 'undefined') {
				jsObject.tempValue['limit'] = 10;
			}
			if (parentTypeId === FORMAT_ATOMIC.id) {
				parentItem.type_id = COLUMN_ARR.id;
				parentItem.lengthIsUndefined = true;
				parentItem.disabled = true;

				if (parentItem.id === 0) {
					jsObject.blocks[0][0].type_id = COLUMN_OBJ.id;
					jsObject.blocks[0][0].key = 'n';
					jsObject.blocks[0][0].value = {};
					jsObject.blocks[0][0].source.value = { 
						source_id: SOURCE_DB.id,
						...jsObject.tempValue, 
					}
				}
			}
			else {
				currentItem.type_id = COLUMN_ARR.id;
				currentItem.lengthIsUndefined = true;
				currentItem.disabled = true;
				jsObject.blocks[itemId] = [{
					parent_id: currentItem.parent_id,
					id: Date.now(),
					type_id: COLUMN_OBJ.id,
					key: 'n',
					value: {},
					source: {
						key: undefined,
						value: { 
							source_id: SOURCE_DB.id,
							...jsObject.tempValue, 
						},
					},
				}];
				jsObject.data[jsObject.blocks[itemId][0].id] = jsObject.blocks[itemId][0];
			}
		}

		// console.log('jsObject', itemId, jsObject);
		jsObject.tempValue = {};
		onClose();
	}
};

export default onSave;
