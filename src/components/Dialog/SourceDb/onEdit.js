import Store from 'components/Store';
import getDefaultValueByTypeId from 'components/JsObject/getDefaultValueByTypeId.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

const onEdit = (e, id, onClose) => {
	id = Number(id);

	const {
		jsObject,
		db: {
			columns: dbColumnsData,
		},
	} = Store().getState();
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const tempValue = jsObject.tempValue;
	const sourceValue = {
		...tempValue,
		source_type_id: SOURCE_TYPE_DB.id,
		columns: {},
	};
	const {
		is_collection: isCollection,
		select,
	} = (tempValue || {});
	const currentItem = data[id];
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];

	select.forEach((columnId) => (
		sourceValue.columns[columnId] = dbColumnsData[columnId].name
	));

	if (isCollection) {
		currentItem.collection = sourceValue;

		blocks[id].forEach((item, index) => {
			if (item.data_type_id === DATA_TYPE_OBJECT.id
				&& typeof item.value === 'object'
				&& item.value.is_collection) {
				data[item.id].value = sourceValue;
			}
		});
	}
	else if (select.length > 1) {
		currentItem.value = sourceValue;
	}
	else if (select.length === 1) {
		if ((parentItem || {}).data_type_id !== DATA_TYPE_ARRAY.id) {
			currentItem.key = dbColumnsData[select[0]].name;
		}
		currentItem.data_type_id = dbColumnsData[select[0]].data_type_id;
		currentItem.value = getDefaultValueByTypeId(currentItem.data_type_id);
		currentItem.disabledType = true;
		currentItem.value = sourceValue;
	}

	jsObject.tempValue = {};
	onClose();
};

export default onEdit;
