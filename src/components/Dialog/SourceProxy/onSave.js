import Store from 'components/Store';
// import { SOURCE_PROXY_PASS } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	COLUMN_OBJ,
	// COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const onSave = (e, itemId, onClose) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const currentItem = jsObject.data[itemId];
	const parentItem = jsObject.data[currentItem.parent_id];
	const parentTypeId = parentItem.type_id;

	if (typeof currentItem === 'object') {
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
		onClose();
	}
};

export default onSave;
