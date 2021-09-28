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

const onSave = (e, itemId, onClose) => {
	itemId = Number(itemId);

	const {
		jsObject,
		dbColumns,
	} = Store().getState();
	const currentItem = jsObject.data[itemId];
	const parentItem = jsObject.data[currentItem.parent_id];
	const parentTypeId = parentItem.type_id;

	if (typeof currentItem === 'object') {
		let newId = Date.now();

		if (jsObject.tempValue.select.length === 1
			&& !jsObject.tempValue.is_collection) {
			currentItem.type_id = dbColumns[jsObject.tempValue.select[0]].type_id;
			currentItem.value = getDefaultValueByTypeId(currentItem.type_id);
		}
		else if (jsObject.tempValue.select.length > 1
			&& !jsObject.tempValue.is_collection) {
			if (parentTypeId === FORMAT_ATOMIC.id) {
				parentItem.type_id = COLUMN_OBJ.id;
				parentItem.disabled = true;

				if (parentItem.id === 0) {
					jsObject.data[itemId] = getTemplate({
						...jsObject.data[itemId],
						type_id: dbColumns.data[jsObject.tempValue.select[0]].type_id === COLUMN_ID.id
							? COLUMN_NUMBER.id
							: dbColumns.data[jsObject.tempValue.select[0]].type_id,
						key: dbColumns.data[jsObject.tempValue.select[0]].name,
						column_id: jsObject.tempValue.select[0],
					});
					jsObject.data[itemId].value = getDefaultValueByTypeId(jsObject.data[itemId].type_id);
					jsObject.blocks[0] = [
						jsObject.data[itemId],
					];
					jsObject
						.tempValue
						.select
						.forEach((id, index) => {
							if (index > 0) {
								newId = newId + 1;
								jsObject.data[newId] = getTemplate({
									id: newId,
									type_id: dbColumns.data[id].type_id === COLUMN_ID.id
										? COLUMN_NUMBER.id
										: dbColumns.data[id].type_id,
									key: dbColumns.data[id].name,
									column_id: id,
								});
								jsObject.data[newId].value = getDefaultValueByTypeId(jsObject.data[newId].type_id);
								jsObject.blocks[0].push(jsObject.data[newId]);
							}
						});
				}
			}
			else {
				currentItem.type_id = COLUMN_OBJ.id;
				currentItem.disabled = true;
				jsObject.blocks[itemId] = [];
				jsObject
					.tempValue
					.select
					.forEach((id, index) => {
						newId = newId + 1;

						jsObject.data[newId] = getTemplate({
							parent_id: itemId,
							id: newId,
							type_id: dbColumns.data[id].type_id === COLUMN_ID.id
								? COLUMN_NUMBER.id
								: dbColumns.data[id].type_id,
							key: dbColumns.data[id].name,
							column_id: id,
						});
						jsObject.data[newId].value = getDefaultValueByTypeId(jsObject.data[newId].type_id);
						jsObject.blocks[itemId].push(jsObject.data[newId]);
					});
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
				parentItem.source.value = {
					source_id: SOURCE_DB.id,
					value: {
						...jsObject.tempValue,
					},
				};

				if (parentItem.id === 0) {
					jsObject.blocks[itemId] = [];
					jsObject.blocks[0][0].type_id = COLUMN_OBJ.id;
					jsObject.blocks[0][0].key = 'n';
					jsObject.blocks[0][0].value = undefined;
					jsObject.data[jsObject.blocks[0][0].id] = jsObject.blocks[0][0];
					jsObject
						.tempValue
						.select
						.forEach((id, index) => {
							newId = newId + 1;

							jsObject.data[newId] = getTemplate({
								parent_id: itemId,
								id: newId,
								type_id: dbColumns.data[id].type_id === COLUMN_ID.id
									? COLUMN_NUMBER.id
									: dbColumns.data[id].type_id,
								key: dbColumns.data[id].name,
								column_id: id,
							});
							jsObject.data[newId].value = dbColumns.data[id].default_value ?? getDefaultValueByTypeId(jsObject.data[newId].type_id);
							jsObject.blocks[itemId].push(jsObject.data[newId]);
						});
				}
			}
			else {
				currentItem.type_id = COLUMN_ARR.id;
				currentItem.lengthIsUndefined = true;
				currentItem.disabled = true;
				currentItem.source.value = {
					source_id: SOURCE_DB.id,
					value: {
						...jsObject.tempValue,
					},
				};
				jsObject.blocks[itemId] = [
					getTemplate({
						parent_id: itemId,
						id: newId,
						type_id: COLUMN_OBJ.id,
						key: 'n',
						value: {},
					}),
				];
				jsObject.data[jsObject.blocks[itemId][0].id] = jsObject.blocks[itemId][0];
				jsObject.blocks[jsObject.blocks[itemId][0].id] = [];
				jsObject
					.tempValue
					.select
					.forEach((id, index) => {
						newId = newId + 1;

						jsObject.data[newId] = getTemplate({
							parent_id: jsObject.blocks[itemId][0].id,
							id: newId,
							type_id: dbColumns.data[id].type_id === COLUMN_ID.id
								? COLUMN_NUMBER.id
								: dbColumns.data[id].type_id,
							key: dbColumns.data[id].name,
							column_id: id,
						});
						jsObject.data[newId].value = dbColumns.data[id].default_value ?? getDefaultValueByTypeId(jsObject.data[newId].type_id);
						jsObject.blocks[jsObject.blocks[itemId][0].id].push(jsObject.data[newId]);
					});
			}
		}

		// console.log('jsObject', { ...jsObject.tempValue });
		jsObject.tempValue = {};
		onClose();
	}
};

export default onSave;
