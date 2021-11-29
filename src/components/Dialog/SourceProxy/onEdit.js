import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import onRemove from 'components/JsObject/Remove/onRemove.js';
import { SOURCE_TYPE_PROXY_PASS } from 'structures/sourceTypes.js';
import { DATA_TYPE_OBJECT } from 'structures/dataTypes.js';

const onEdit = (e, id, onClose) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const tempValue = jsObject.tempValue;
	const sourceValue = {
		...tempValue,
		source_type_id: SOURCE_TYPE_PROXY_PASS.id,
	};
	let newId = Date.now(),
		sectionItem,
		dataItem;
	const currentItem = data[id] || {};

	onRemove(undefined, id);

	data[newId] = getTemplate({
		parent_id: currentItem.parent_id,
		id: newId,
		data_type_id: DATA_TYPE_OBJECT.id,
		key: generateKey(blocks[currentItem.parent_id] ?? []),
		value: sourceValue,
		disabledType: true,
		disabledValue: true,
		disabledRemove: true,
	});
	sectionItem = data[newId];
	blocks[sectionItem.id] = [];
	blocks[currentItem.parent_id] = (blocks[currentItem.parent_id] ?? []);
	blocks[currentItem.parent_id].push(data[newId]);

	newId += 1;
	data[newId] = getTemplate({
		parent_id: sectionItem.id,
		id: newId,
		data_type_id: DATA_TYPE_OBJECT.id,
		key: generateKey(blocks[currentItem.id] ?? []),
		value: undefined,
		disabledType: true,
		disabledValue: true,
		disabledRemove: true,
	});
	dataItem = data[newId];
	blocks[dataItem.id] = [];
	blocks[sectionItem.id].push(data[newId]);
	onClose();
};

export default onEdit;
