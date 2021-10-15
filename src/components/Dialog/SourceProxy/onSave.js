import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import { SOURCE_PROXY_PASS } from 'structures/source.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	COLUMN_OBJ,
	// COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const onSave = (e, id, onClose) => {
	e.preventDefault();

	const {
		jsObject,
		routes,
	} = Store().getState();
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const tempValue = jsObject.tempValue;
	const routesData = routes.data;
	const routeId = tempValue.route_id;
	const route = routesData.find((item) => item.id === routeId);
	const sourceValue = {
		...tempValue,
		source_id: SOURCE_PROXY_PASS.id,
		columns: {
			statusCode: 'statusCode',
			uri: 'uri',
			method: 'method',
			headers: 'headers',
			data: 'data',
		},
	};
	let newId = Date.now();
	const currentItem = data[id] || {};
	const parentId = currentItem.parent_id;
	const parentItem = data[parentId];
	const parentTypeId = (parentItem || {}).type_id || currentItem.type_id;
	const responseParsed = {};
	let responseKeys = Object.keys(route.response),
		childId = newId - 999999;

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

	if (parentTypeId === FORMAT_ATOMIC.id) {
		let dataItem;

		parentItem.type_id = COLUMN_OBJ.id;
		currentItem.type_id = COLUMN_OBJ.id;
		currentItem.key = generateKey(blocks[parentId]);
		currentItem.value = sourceValue;
		currentItem.disabledType = true;
		currentItem.disabledRemove = true;

		data[newId] = getTemplate({
			parent_id: currentItem.id,
			id: newId,
			type_id: COLUMN_OBJ.id,
			key: generateKey(blocks[currentItem.id] ?? []),
			value: undefined,
			disabledType: true,
			disabledValue: true,
			disabledRemove: true,
		});

		data[newId] = getTemplate({
			parent_id: currentItem.id,
			id: newId,
			type_id: COLUMN_OBJ.id,
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

		currentItem.type_id = COLUMN_OBJ.id;
		currentItem.value = undefined;
		data[newId] = getTemplate({
			parent_id: currentItem.id,
			id: newId,
			type_id: COLUMN_OBJ.id,
			key: generateKey(blocks[currentItem.id] ?? []),
			value: sourceValue,
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
			type_id: COLUMN_OBJ.id,
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
	onClose();
};

export default onSave;
