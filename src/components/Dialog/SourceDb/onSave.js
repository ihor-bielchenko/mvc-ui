import Store from 'components/Store';
import getDefaultValueByTypeId from 'components/JsObject/getDefaultValueByTypeId.js';
import getTemplate from 'components/JsObject/getTemplate.js';
import getNewItemKey from 'components/JsObject/Parent/getNewItemKey.js';
import { SOURCE_DB } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
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
		offset: 0,
		limit: 0,
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
		currentItem.type_id = COLUMN_OBJ.id;

		if (parentTypeId === FORMAT_ATOMIC.id) {
			parentItem.type_id = COLUMN_ARR.id;
			currentItem.key = 'n';
			currentItem.disabledKey = true;
			currentItem.disabledType = true;
			currentItem.value = undefined;
			currentItem.collection = sourceValue;
			blocks[parentId] = [ currentItem ];
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				type_id: COLUMN_OBJ.id,
				key: getNewItemKey(blocks[id] ?? []),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledControl: true,
			});
			blocks[id] = [ data[newId] ];
		}
		else {
			const nId = newId;
			const oId = (newId += 1);

			currentItem.type_id = COLUMN_ARR.id;
			data[nId] = getTemplate({
				parent_id: id,
				id: nId,
				type_id: COLUMN_OBJ.id,
				key: 'n',
				value: undefined,
				disabledKey: true,
				disabledType: true,
				collection: sourceValue,
			});
			blocks[id] = (blocks[id] ?? []);
			blocks[nId] = [];
			blocks[id].push(data[nId]);
			data[oId] = getTemplate({
				parent_id: nId,
				id: oId,
				type_id: COLUMN_OBJ.id,
				key: getNewItemKey(blocks[nId] ?? []),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledControl: true,
			});
			blocks[nId].push(data[oId]);
		}
	}
	else if (select.length > 1) {
		if (parentTypeId === FORMAT_ATOMIC.id) {
			parentItem.type_id = COLUMN_OBJ.id;
			parentItem.disabledType = true;
			data[id] = getTemplate({
				parent_id: parentId,
				id: id,
				type_id: COLUMN_OBJ.id,
				key: getNewItemKey(blocks[parentId] ?? []),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledControl: true,
			});
			blocks[parentId] = [ data[id] ];
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
	jsObject.tempValue = {};
	onClose();
};

export default onSave;
