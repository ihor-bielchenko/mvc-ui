import Store from 'components/Store';
import getDefaultValueByTypeId from 'components/JsObject/getDefaultValueByTypeId.js';
import { SOURCE_DB } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	// COLUMN_ID,
	// COLUMN_OBJ,
	COLUMN_ARR,
	// COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const onEdit = (e, id, onClose) => {
	id = Number(id);

	const {
		jsObject,
		dbColumns: {
			data: dbColumnsData,
		},
	} = Store().getState();
	const data = jsObject.data;
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
	const currentItem = data[id];
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentTypeId = (parentItem || {}).type_id || currentItem.type_id;

	select.forEach((columnId) => (
		sourceValue.columns[columnId] = dbColumnsData[columnId].name
	));

	if (isCollection) {
		if (parentTypeId === FORMAT_ATOMIC.id) {

		}
		else {

		}
	}
	else if (select.length > 1) {
		currentItem.value = sourceValue;
	}
	else if (select.length === 1) {
		if ((parentItem || {}).type_id !== COLUMN_ARR.id) {
			currentItem.key = dbColumnsData[select[0]].name;
		}
		currentItem.type_id = dbColumnsData[select[0]].type_id;
		currentItem.value = getDefaultValueByTypeId(currentItem.type_id);
		currentItem.disabledType = true;
		currentItem.value = sourceValue;
	}

	jsObject.tempValue = {};
	onClose();

	console.log('jsObject', jsObject);
};

export default onEdit;
