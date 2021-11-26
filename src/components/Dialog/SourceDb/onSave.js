import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import onDialog from 'components/Dialog/onDialog.js';
import unique from 'utils/unique.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { DIALOG_KEY_EXISTS } from 'consts/dialog.js';
import onClose from '../onClose.js';

const merge = (id, tempValue, sourceValue, onCloseDb) => {
	const {
		jsObject,
		db: {
			columns: dbColumnsData,
		},
	} = Store().getState();
	const blocks = jsObject.blocks;
	const data = jsObject.data;
	const {
		is_collection: isCollection,
		select,
	} = (tempValue || {});
	const currentItem = data[id] || {};
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentDataTypeId = (parentItem || {}).data_type_id || currentItem.data_type_id;
	const _sourceValue = {
		...sourceValue,
		columns: (() => {
			const collector = {};

			Object
				.keys(sourceValue.columns)
				.forEach((key) => {
					collector[key] = sourceValue.columns[key][1]
						? unique() +'_'+ sourceValue.columns[key][0]
						: sourceValue.columns[key][0];
				});
			return collector;
		})(),
	};
	let newId = Date.now();

	if (isCollection) {
		currentItem.data_type_id = DATA_TYPE_OBJECT.id;

		if (parentDataTypeId === DATA_TYPE_ATOMIC.id) {
			parentItem.data_type_id = DATA_TYPE_ARRAY.id;
			currentItem.key = generateKey(blocks[parentId], 'n');
			currentItem.disabledKey = true;
			currentItem.disabledType = true;
			currentItem.value = undefined;
			currentItem.collection = _sourceValue;
			blocks[parentId] = [ currentItem ];
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[id] ?? []),
				value: _sourceValue,
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
				collection: _sourceValue,
			});
			blocks[id] = (blocks[id] ?? []);
			blocks[nId] = [];
			blocks[id].push(data[nId]);
			data[oId] = getTemplate({
				parent_id: nId,
				id: oId,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[nId] ?? []),
				value: _sourceValue,
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
				value: _sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[parentId] = [ data[id] ];
		}
		else {
			currentItem.data_type_id = DATA_TYPE_OBJECT.id;
			currentItem.value = '';
			currentItem.source = undefined;
			currentItem.disabledType = false;
			blocks[id] = (blocks[id] ?? []);
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				data_type_id: DATA_TYPE_OBJECT.id,
				key: generateKey(blocks[id]),
				value: _sourceValue,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[id] = [ ...blocks[id], data[newId] ];
		}
	}
	else if (select.length === 1) {
		if (currentItem.data_type_id === DATA_TYPE_OBJECT.id) {
			blocks[id] = (blocks[id] ?? []);
			data[newId] = getTemplate({
				parent_id: id,
				id: newId,
				data_type_id: dbColumnsData[select[0]].data_type_id === DATA_TYPE_ID.id
					? DATA_TYPE_NUMBER.id
					: dbColumnsData[select[0]].data_type_id,
				key: _sourceValue.columns[Object.keys(_sourceValue.columns)[0]],
				value: _sourceValue,
				disabledType: true,
			});
			blocks[id].push(data[newId]);
		}
		else {
			if ((parentItem || {}).data_type_id !== DATA_TYPE_ARRAY.id) {
				currentItem.key = dbColumnsData[select[0]].name;
			}
			currentItem.data_type_id = dbColumnsData[select[0]].data_type_id === DATA_TYPE_ID.id
				? DATA_TYPE_NUMBER.id
				: dbColumnsData[select[0]].data_type_id;
			currentItem.disabledType = true;
			currentItem.key = _sourceValue.columns[Object.keys(_sourceValue.columns)[0]];
			currentItem.value = _sourceValue;

			select.forEach((columnId) => dbColumnsData[columnId].name);
		}
	}
	jsObject.tempValue = {};
	onCloseDb();
	onClose(DIALOG_KEY_EXISTS)();
	console.log('==========', data);
};

const onSave = (e, id, onCloseDb) => {
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
	const {
		is_collection: isCollection,
		select,
	} = (tempValue || {});
	const sourceValue = {
		offset: 0,
		limit: 0,
		...tempValue,
		source_type_id: SOURCE_TYPE_DB.id,
		columns: {},
	};
	const currentItem = data[id] || {};
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentDataTypeId = (parentItem || {}).data_type_id || currentItem.data_type_id;
	const blockId = ((currentItem.data_type_id === DATA_TYPE_OBJECT.id 
		&& parentDataTypeId === DATA_TYPE_ATOMIC.id)
		|| (currentItem.data_type_id !== DATA_TYPE_OBJECT.id
			&& parentDataTypeId !== DATA_TYPE_ATOMIC.id
			&& select.length === 1))
		? parentId
		: id;
	let keyExistsFlag = false;

	select.forEach((columnId) => {
		sourceValue.columns[columnId] = [ dbColumnsData[columnId].name ];
		
		if (!isCollection) {
			(blocks[blockId] || []).forEach((item) => {
				if (item.value.source_type_id === SOURCE_TYPE_DB.id
					&& typeof item.value === 'object'
					&& typeof item.value.columns === 'object') {
					Object
						.keys(item.value.columns)
						.forEach((columnKey) => {
							if (item.value.columns[columnKey] === dbColumnsData[columnId].name) {
								keyExistsFlag = true;
								sourceValue.columns[columnId].push(true);
							}
						});
				}
				else if (item.key === dbColumnsData[columnId].name) {
					keyExistsFlag = true;
					sourceValue.columns[columnId].push(true);
				}
			});
		}
	});

	if (keyExistsFlag) {
		onDialog(DIALOG_KEY_EXISTS, {
			merge: () => {
				merge(id, tempValue, sourceValue, onCloseDb);
			},
		})(e);
	}
	else {
		merge(id, tempValue, sourceValue, onCloseDb);
	}
};

export default onSave;
