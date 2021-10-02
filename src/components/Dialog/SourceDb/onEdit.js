// import Store from 'components/Store';
// import getDefaultValueByTypeId from 'components/JsObject/getDefaultValueByTypeId.js';
// import getTemplate from 'components/JsObject/getTemplate.js';
// import { SOURCE_DB } from 'structures/source.js';
// import { FORMAT_ATOMIC } from 'structures/format.js';
// import {
// 	COLUMN_ID,
// 	COLUMN_OBJ,
// 	COLUMN_ARR,
// 	COLUMN_NUMBER,
// } from 'structures/columnTypes.js';

const onEdit = (e, id, onClose) => {
	// id = Number(id);

	// const {
	// 	jsObject,
	// 	dbColumns: {
	// 		data: dbColumnsData,
	// 	},
	// } = Store().getState();
	// const data = jsObject.data;
	// const blocks = jsObject.blocks;
	// const tempValue = jsObject.tempValue;
	// const sourceValue = {
	// 	source_id: SOURCE_DB.id,
	// 	...tempValue,
	// };
	// const {
	// 	is_collection: isCollection,
	// 	select,
	// } = (tempValue || {});
	// const currentItem = data[id];
	// const parentId = currentItem.parent_id;
	// const parentItem = data[parentId];
	// const parentTypeId = (parentItem || {}).type_id || currentItem.type_id;
	// let newId = Date.now(),
	// 	firstBindIndex = -1;

	// console.log('currentItem', currentItem);

	// if (isCollection) {
	// 	if (parentTypeId === FORMAT_ATOMIC.id) {

	// 	}
	// 	else {

	// 	}
	// }
	// else if (select.length === 1) {
	// 	if ((parentItem || {}).type_id !== COLUMN_ARR.id) {
	// 		currentItem.key = dbColumnsData[select[0]].name;
	// 	}
	// 	currentItem.type_id = dbColumnsData[select[0]].type_id;
	// 	currentItem.value = getDefaultValueByTypeId(currentItem.type_id);
	// 	currentItem.disabledType = true;
	// 	currentItem.value = sourceValue;
	// }
	// else if (select.length > 1) {
	// 	if (parentTypeId === FORMAT_ATOMIC.id) {

	// 	}
	// 	else {
	// 		// currentItem.type_id = COLUMN_OBJ.id;
	// 		// currentItem.disabledKey = true;
	// 		// currentItem.disabledType = true;
	// 		// currentItem.source = sourceValue;

	// 		// ([ ...blocks[id] ]).forEach((item, i) => {
	// 		// 	if ((item.bind || {}).id === currentItem.bind_id) {
	// 		// 		blocks[id].splice(i, 1);
	// 		// 		delete data[item.id];
					
	// 		// 		if (firstBindIndex === -1) {
	// 		// 			firstBindIndex = i;
	// 		// 		}
	// 		// 	}
	// 		// });
	// 		// select.forEach((columnId, index) => {
	// 		// 	newId = newId + 1;
	// 		// 	data[newId] = getTemplate({
	// 		// 		bind_id: id,
	// 		// 		parent_id: id,
	// 		// 		id: newId,
	// 		// 		type_id: dbColumnsData[columnId].type_id === COLUMN_ID.id
	// 		// 			? COLUMN_NUMBER.id
	// 		// 			: dbColumnsData[columnId].type_id,
	// 		// 		key: dbColumnsData[columnId].name,
	// 		// 		column_id: columnId,
	// 		// 		disabledType: true,
	// 		// 		disabledValue: true,
	// 		// 		disabledControl: true,
	// 		// 	});
	// 		// 	data[newId].value = getDefaultValueByTypeId(data[newId].type_id);
	// 		// 	blocks[id].splice(firstBindIndex);
	// 		// });
	// 	}
	// 	console.log('currentItem', parentTypeId, currentItem);
	// }
};

export default onEdit;
