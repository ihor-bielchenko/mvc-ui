import Store from 'components/Store';
import getDefaultValueByTypeId from 'components/JsObject/getDefaultValueByTypeId.js';
import getTemplate from 'components/JsObject/getTemplate.js';
import { SOURCE_DB } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	COLUMN_ID,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NUMBER,
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
		source_id: SOURCE_DB.id,
		value: { 
			...tempValue, 
		},
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

	if (isCollection) {
		tempValue.offset = tempValue.offset ?? 0;
		tempValue.limit = tempValue.limit ?? 0;
		currentItem.type_id = COLUMN_OBJ.id;
		currentItem.value = undefined;

		if (parentTypeId === FORMAT_ATOMIC.id) {
			parentItem.type_id = COLUMN_ARR.id;
			parentItem.lengthIsUndefined = true;
			currentItem.key = 'n';
			currentItem.disabledKey = true;
			currentItem.disabledType = true;
			currentItem.lengthIsUndefined = true;
			currentItem.source = sourceValue;
			blocks[id] = [];
			blocks[parentId] = [ currentItem ];
			select.forEach((columnId, index) => {
				newId = newId + 1;
				data[newId] = getTemplate({
					parent_id: id,
					id: newId,
					type_id: dbColumnsData[columnId].type_id === COLUMN_ID.id
						? COLUMN_NUMBER.id
						: dbColumnsData[columnId].type_id,
					key: dbColumnsData[columnId].name,
					column_id: columnId,
					disabledType: true,
					disabledValue: true,
					disabledControl: true,
				});
				data[newId].value = dbColumnsData[columnId].default_value 
					?? getDefaultValueByTypeId(data[newId].type_id);
				blocks[id].push(data[newId]);
			});
		}
		else {
			currentItem.type_id = COLUMN_ARR.id;
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				type_id: COLUMN_OBJ.id,
				key: 'n',
				value: undefined,
				disabledKey: true,
				disabledType: true,
				lengthIsUndefined: true,
				source: sourceValue,
			});
			blocks[newId] = [];
			blocks[id] = [ data[newId] ];
			select.forEach((columnId, index) => {
				newId = newId + 1;
				data[newId] = getTemplate({
					parent_id: blocks[id][0].id,
					id: newId,
					type_id: dbColumnsData[columnId].type_id === COLUMN_ID.id
						? COLUMN_NUMBER.id
						: dbColumnsData[columnId].type_id,
					key: dbColumnsData[columnId].name,
					column_id: columnId,
					disabledType: true,
					disabledValue: true,
					disabledControl: true,
				});
				data[newId].value = data[id].default_value 
					?? getDefaultValueByTypeId(data[newId].type_id);
				blocks[blocks[id][0].id].push(data[newId]);
			});
		}
	}
	else if (select.length === 1) {
		if ((parentItem || {}).type_id !== COLUMN_ARR.id) {
			currentItem.key = dbColumnsData[select[0]].name;
		}
		currentItem.type_id = dbColumnsData[select[0]].type_id;
		currentItem.value = getDefaultValueByTypeId(currentItem.type_id);
		currentItem.disabledType = true;
		currentItem.disabledValue = true;
		currentItem.disabledControl = true;
		currentItem.source = sourceValue;
	}
	else if (select.length > 1) {
		if (parentTypeId === FORMAT_ATOMIC.id) {
			parentItem.type_id = COLUMN_OBJ.id;
			parentItem.disabledKey = true;
			parentItem.disabledType = true;
			parentItem.source = sourceValue;
			data[id] = getTemplate({
				...(data[id] || {}),
				type_id: dbColumnsData[select[0]].type_id === COLUMN_ID.id
					? COLUMN_NUMBER.id
					: dbColumnsData[select[0]].type_id,
				key: dbColumnsData[select[0]].name,
				column_id: select[0],
				disabledType: true,
				disabledValue: true,
				disabledControl: true,
			});
			data[id].value = getDefaultValueByTypeId(data[id].type_id);
			blocks[parentId] = [ data[id] ];
			select.forEach((columnId, index) => {
				if (index > 0) {
					newId = newId + 1;
					jsObject.data[newId] = getTemplate({
						id: newId,
						type_id: dbColumnsData[columnId].type_id === COLUMN_ID.id
							? COLUMN_NUMBER.id
							: dbColumnsData[columnId].type_id,
						key: dbColumnsData[columnId].name,
						column_id: columnId,
						disabledType: true,
						disabledValue: true,
						disabledControl: true,
					});
					data[newId].value = getDefaultValueByTypeId(data[newId].type_id);
					blocks[parentId].push(data[newId]);
				}
			});
		}
		else {
			currentItem.type_id = COLUMN_OBJ.id;
			currentItem.disabledKey = true;
			currentItem.disabledType = true;
			currentItem.source = sourceValue;
			blocks[id] = [];
			select.forEach((columnId, index) => {
				newId = newId + 1;
				data[newId] = getTemplate({
					parent_id: id,
					id: newId,
					type_id: dbColumnsData[columnId].type_id === COLUMN_ID.id
						? COLUMN_NUMBER.id
						: dbColumnsData[columnId].type_id,
					key: dbColumnsData[columnId].name,
					column_id: columnId,
					disabledType: true,
					disabledValue: true,
					disabledControl: true,
				});
				data[newId].value = getDefaultValueByTypeId(data[newId].type_id);
				blocks[id].push(data[newId]);
			});
		}
	}
	jsObject.tempValue = {};
	onClose();
};

export default onSave;
