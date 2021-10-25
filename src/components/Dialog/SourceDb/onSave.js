import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

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
		source_type_id: SOURCE_TYPE_DB.id,
		columns: {},
	};
	const {
		is_collection: isCollection,
		select,
	} = (tempValue || {});
	let newId = Date.now();
	const currentItem = data[id] || {};
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentDataTypeId = (parentItem || {}).data_type_id || currentItem.data_type_id;

	select.forEach((columnId) => (
		sourceValue.columns[columnId] = dbColumnsData[columnId].name
	));

	if (isCollection) {
		currentItem.data_type_id = DATA_TYPE_OBJECT.id;

		if (parentDataTypeId === DATA_TYPE_ATOMIC.id) {
			parentItem.data_type_id = DATA_TYPE_ARRAY.id;
			currentItem.key = generateKey(blocks[parentId], 'n');
			currentItem.disabledKey = true;
			currentItem.disabledType = true;
			currentItem.value = undefined;
			currentItem.collection = sourceValue;
			blocks[parentId] = [ currentItem ];
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[id] ?? []),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[id] = [ data[newId] ];
		}
		else {
			const nId = newId;
			const oId = (newId += 1);

			currentItem.data_type_id = DATA_TYPE_ARRAY.id;
			data[nId] = getTemplate({
				parent_id: id,
				id: nId,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[id], 'n'),
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
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[nId] ?? []),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[nId].push(data[oId]);
		}
	}
	else if (select.length > 1) {
		if (parentDataTypeId === DATA_TYPE_ATOMIC.id) {
			parentItem.data_type_id = DATA_TYPE_OBJECT.id;
			data[id] = getTemplate({
				parent_id: parentId,
				id: id,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[parentId] ?? []),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[parentId] = [ data[id] ];
		}
		else {
			currentItem.data_type_id = DATA_TYPE_OBJECT.id;
			blocks[id] = (blocks[id] ?? []);
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[id]),
				value: sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[id].push(data[newId]);
		}
	}
	else if (select.length === 1) {
		if (currentItem.data_type_id === DATA_TYPE_OBJECT.id) {
			blocks[id] = (blocks[id] ?? []);
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				data_type_id: dbColumnsData[select[0]].data_type_id,
				key: dbColumnsData[select[0]].name,
				value: sourceValue,
				disabledType: true,
			});
			blocks[id].push(data[newId]);
		}
		else {
			if ((parentItem || {}).data_type_id !== DATA_TYPE_ARRAY.id) {
				currentItem.key = dbColumnsData[select[0]].name;
			}
			currentItem.data_type_id = dbColumnsData[select[0]].data_type_id;
			currentItem.disabledType = true;
			currentItem.value = sourceValue;

			select.forEach((columnId) => dbColumnsData[columnId].name);
		}
	}
	jsObject.tempValue = {};
	onClose();
};

export default onSave;
