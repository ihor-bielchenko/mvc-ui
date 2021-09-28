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

const setAsArray = (item = {}, sourceValue = {}) => {
	item.type_id = COLUMN_ARR.id;
	item.lengthIsUndefined = true;
	item.disabled = true;
	item.source.value = {
		source_id: SOURCE_DB.id,
		value: {
			...sourceValue,
		},
	};

	return item;
};

const onSave = (e, id, onClose) => {
	id = Number(id);

	const {
		jsObject,
		dbColumns,
	} = Store().getState();
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const tempValue = jsObject.tempValue;
	const currentItem = data[id];
	const parentItem = data[currentItem.parent_id];
	const parentTypeId = parentItem.type_id;
	const {
		is_collection: isCollection,
		select,
	} = (tempValue || {});
	let newId = Date.now();

	if (isCollection) {
		const nArrItem = ;

		tempValue.offset = tempValue.offset ?? 0;
		tempValue.limit = tempValue.limit ?? 0;

		if (parentTypeId !== COLUMN_OBJ.id && parentTypeId !== COLUMN_ARR.id) {
			parentItem = setAsArray(parentItem, tempValue);
		}
	}
	else if (select.length === 1) {

	}
	else if (select.length > 1) {

	}
};

export default onSave;
