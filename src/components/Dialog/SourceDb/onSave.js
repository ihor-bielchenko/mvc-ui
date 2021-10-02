import Store from 'components/Store';
import getDefaultValueByTypeId from 'components/JsObject/getDefaultValueByTypeId.js';
import getTemplate from 'components/JsObject/getTemplate.js';
import getNewItemKey from 'components/JsObject/Wrapper/getNewItemKey.js';
import { SOURCE_DB } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	// COLUMN_ID,
	COLUMN_OBJ,
	COLUMN_ARR,
	// COLUMN_NUMBER,
	// COLUMN_DB,
} from 'structures/columnTypes.js';

const onSave = (e, id, onClose) => {
	id = Number(id);

	const {
		jsObject,
		dbColumns: {
			data: dbColumnsData,
		},
	} = Store().getState();
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const tempValue = jsObject.tempValue;
	const sourceValue = {
		...tempValue,
		source_id: SOURCE_DB.id,
		columns: {},
	};
	const {
		is_collection: isCollection,
		select,
	} = (tempValue || {});
	let newId = Date.now();
	const currentItem = data[id];
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentTypeId = (parentItem || {}).type_id || currentItem.type_id;

	select.forEach((columnId) => (
		sourceValue.columns[columnId] = dbColumnsData[columnId].name
	));

	if (isCollection) {
		tempValue.offset = tempValue.offset ?? 0;
		tempValue.limit = tempValue.limit ?? 0;
		
		if (parentTypeId === FORMAT_ATOMIC.id) {
			
		}
		else {
		
		}
	}
	else if (select.length === 1) {
		if ((parentItem || {}).type_id !== COLUMN_ARR.id) {
			currentItem.key = dbColumnsData[select[0]].name;
		}
		currentItem.type_id = dbColumnsData[select[0]].type_id;
		currentItem.value = getDefaultValueByTypeId(currentItem.type_id);
		currentItem.disabledType = true;
		currentItem.value = sourceValue;

		select.forEach((columnId) => dbColumnsData[columnId].name);
	}
	else if (select.length > 1) {
		if (parentTypeId === FORMAT_ATOMIC.id) {
			
		}
		else {
			currentItem.type_id = COLUMN_OBJ.id;
			currentItem.disabledType = true;
			blocks[id] = (blocks[id] ?? []);
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				type_id: COLUMN_OBJ.id,
				key: getNewItemKey(blocks[id]),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledControl: true,
			});
			blocks[id].push(data[newId]);
		}
	}
	jsObject.tempValue = {};
	onClose();
};

export default onSave;
