import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import onRemove from 'components/JsObject/Remove/onRemove.js';
import { SOURCE_PROXY_PASS } from 'structures/source.js';
import {
	COLUMN_OBJ,
	// COLUMN_NUMBER,
} from 'structures/columnTypes.js';

const onEdit = (e, id, onClose) => {
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
	};
	let newId = Date.now(),
		sectionItem,
		dataItem;
	const currentItem = data[id] || {};
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

	onRemove(undefined, id);

	data[newId] = getTemplate({
		parent_id: currentItem.parent_id,
		id: newId,
		type_id: COLUMN_OBJ.id,
		key: generateKey(blocks[currentItem.parent_id] ?? []),
		value: sourceValue,
		disabledType: true,
		disabledValue: true,
		disabledControl: true,
	});
	sectionItem = data[newId];
	blocks[sectionItem.id] = [];
	blocks[currentItem.parent_id] = (blocks[currentItem.parent_id] ?? []);
	blocks[currentItem.parent_id].push(data[newId]);

	newId += 1;
	data[newId] = getTemplate({
		parent_id: sectionItem.id,
		id: newId,
		type_id: COLUMN_OBJ.id,
		key: generateKey(blocks[currentItem.id] ?? []),
		value: undefined,
		disabledType: true,
		disabledValue: true,
		disabledControl: true,
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
		data[responseParsed[key].id].disabledControl = true;
		blocks[data[responseParsed[key].id].parent_id] = (blocks[data[responseParsed[key].id].parent_id] ?? []);
		blocks[data[responseParsed[key].id].parent_id].push(data[responseParsed[key].id]);
	});
	onClose();

	// console.log('data, blocks', data, blocks);
};

export default onEdit;
