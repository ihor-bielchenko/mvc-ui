import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import onDialog from 'components/Dialog/onDialog.js';
import unique from 'utils/unique.js';
import { SOURCE_TYPE_PROXY_PASS } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
} from 'structures/dataTypes.js';
import { DIALOG_KEY_EXISTS } from 'consts/dialog.js';
import onClose from '../onClose.js';

const merge = (id, tempValue, sourceValue, onCloseProxy) => {
	const {
		jsObject,
		routes,
	} = Store().getState();
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const routesData = routes.data;
	const routeId = tempValue.route_id;
	const route = routesData.find((item) => item.id === routeId);
	let newId = Date.now();
	const currentItem = data[id] || {};
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentDataTypeId = (parentItem || {}).data_type_id || currentItem.data_type_id;
	const responseParsed = {};
	let responseKeys = Object.keys(route.response),
		childId = newId - 999999;
	const _sourceValue = {
		...sourceValue,
		columns: (() => {
			const collector = {};

			Object
				.keys(sourceValue.columns)
				.forEach((key) => {
					collector[key] = sourceValue.columns[key][1]
						? unique() +'-'+ sourceValue.columns[key][0]
						: sourceValue.columns[key][0];
				});
			return collector;
		})()
	};

	responseKeys.forEach((key) => {
		if (route.response[key].id > 0) {
			const _id = route.response[key].id + childId;

			responseParsed[_id] = ({
				...route.response[key],
				id: _id,
				parent_id: route.response[key].parent_id === 0
					? route.response[key].parent_id
					: route.response[key].parent_id + childId,
			});
		}
	});
	responseKeys = Object.keys(responseParsed);

	if (parentDataTypeId === DATA_TYPE_ATOMIC.id) {
		let dataItem;

		parentItem.data_type_id = DATA_TYPE_OBJECT.id;
		currentItem.data_type_id = DATA_TYPE_OBJECT.id;
		currentItem.key = generateKey(blocks[parentId]);
		currentItem.value = _sourceValue;
		currentItem.disabledType = true;
		currentItem.disabledRemove = true;

		data[newId] = getTemplate({
			parent_id: currentItem.id,
			id: newId,
			data_type_id: DATA_TYPE_OBJECT.id,
			key: generateKey(blocks[currentItem.id] ?? []),
			value: undefined,
			disabledType: true,
			disabledValue: true,
			disabledRemove: true,
		});
		blocks[currentItem.id] = [ data[newId] ];

		data[newId] = getTemplate({
			parent_id: currentItem.id,
			id: newId,
			data_type_id: DATA_TYPE_OBJECT.id,
			key: generateKey(blocks[currentItem.id] ?? []),
			value: undefined,
			disabledType: true,
			disabledValue: true,
			disabledRemove: true,
		});
		dataItem = data[newId];
		blocks[newId] = [];
		responseKeys.forEach((key) => {
			if (responseParsed[key].parent_id === 0) {
				responseParsed[key].parent_id = dataItem.id;
			}
			data[responseParsed[key].id] = { ...responseParsed[key] };
			data[responseParsed[key].id].disabledKey = true;
			data[responseParsed[key].id].disabledType = true;
			data[responseParsed[key].id].disabledValue = true;
			data[responseParsed[key].id].disabledRemove = true;
			blocks[data[responseParsed[key].id].parent_id] = (blocks[data[responseParsed[key].id].parent_id] ?? []);
			blocks[data[responseParsed[key].id].parent_id].push(data[responseParsed[key].id]);
		});
	}
	else {
		let sectionItem,
			dataItem;

		currentItem.data_type_id = DATA_TYPE_OBJECT.id;
		currentItem.value = undefined;
		data[newId] = getTemplate({
			parent_id: currentItem.id,
			id: newId,
			data_type_id: DATA_TYPE_OBJECT.id,
			key: generateKey(blocks[currentItem.id] ?? []),
			value: _sourceValue,
			disabledType: true,
			disabledValue: true,
			disabledRemove: true,
		});
		sectionItem = data[newId];
		blocks[sectionItem.id] = [];
		blocks[currentItem.id] = (blocks[currentItem.id] ?? []);
		blocks[currentItem.id].push(data[newId]);

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

		responseKeys.forEach((key) => {
			if (responseParsed[key].parent_id === 0) {
				responseParsed[key].parent_id = dataItem.id;
			}
			data[responseParsed[key].id] = { ...responseParsed[key] };
			data[responseParsed[key].id].disabledKey = true;
			data[responseParsed[key].id].disabledType = true;
			data[responseParsed[key].id].disabledValue = true;
			data[responseParsed[key].id].disabledRemove = true;
			blocks[data[responseParsed[key].id].parent_id] = (blocks[data[responseParsed[key].id].parent_id] ?? []);
			blocks[data[responseParsed[key].id].parent_id].push(data[responseParsed[key].id]);
		});
	}
	onCloseProxy();
	onClose(DIALOG_KEY_EXISTS)();
};

const onSave = (e, id, onClose) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const tempValue = jsObject.tempValue;
	const sourceValue = {
		...tempValue,
		source_type_id: SOURCE_TYPE_PROXY_PASS.id,
		columns: {
			statusCode: [ 'statusCode', false ],
			uri: [ 'uri', false ],
			method: [ 'method', false ],
			headers: [ 'headers', false ],
			data: [ 'data', false ],
		},
	};
	const currentItem = data[id] || {};
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentDataTypeId = (parentItem || {}).data_type_id || currentItem.data_type_id;
	let keyExistsFlag = false;

	Object
		.keys(sourceValue.columns)
		.forEach((nowColumnKey) => {
			const findIndex = blocks[parentDataTypeId === DATA_TYPE_ATOMIC.id
				? parentId
				: id].findIndex((item) => {
				let columnExistsFlag = false;

				if ((item.value || {}).columns) {
					Object
						.keys((item.value || {}).columns || {})
						.forEach((columnKey) => {
							if (((item.value || {}).columns || {})[columnKey] === sourceValue.columns[nowColumnKey][0]) {
								columnExistsFlag = true;
								sourceValue.columns[nowColumnKey][1] = true;
							}
						});
					}
					return item.key === sourceValue.columns[nowColumnKey][0]
						|| columnExistsFlag;
				});

			if (findIndex > -1) {
				keyExistsFlag = true;
				sourceValue.columns[nowColumnKey][1] = true;
			}
		});

	if (keyExistsFlag) {
		onDialog(DIALOG_KEY_EXISTS, {
			merge: () => merge(id, tempValue, sourceValue, onClose),
		})(e);
	}
	else {
		merge(id, tempValue, sourceValue, onClose);
	}
};

export default onSave;
